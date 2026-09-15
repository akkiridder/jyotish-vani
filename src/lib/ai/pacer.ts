import { delay, randomBetween } from '@/lib/utils'

export interface PacingConfig {
  initialDelay: { min: number; max: number }
  calculatingDuration: number
  typingDuration: { min: number; max: number }
  chunkInterval: number
}

export const DEFAULT_PACING: PacingConfig = {
  initialDelay: { min: 1500, max: 2500 },
  calculatingDuration: 2000,
  typingDuration: { min: 3000, max: 5000 },
  chunkInterval: 1500,
}

export interface TypingCallback {
  onStatusChange: (status: 'idle' | 'calculating_chart' | 'typing') => void
  onChunk: (chunk: string, index: number, total: number) => void
}

export class HumanizationPacer {
  private config: PacingConfig

  constructor(config: PacingConfig = DEFAULT_PACING) {
    this.config = config
  }

  async paceResponse(
    response: string,
    callback: TypingCallback
  ): Promise<string[]> {
    // 1. Initial delay (simulates processing time)
    const initialDelay = randomBetween(
      this.config.initialDelay.min,
      this.config.initialDelay.max
    )
    await delay(initialDelay)

    // 2. Emit "calculating_chart" status
    callback.onStatusChange('calculating_chart')
    await delay(this.config.calculatingDuration)

    // 3. Emit "typing" status
    callback.onStatusChange('typing')
    const typingDuration = randomBetween(
      this.config.typingDuration.min,
      this.config.typingDuration.max
    )
    await delay(typingDuration)

    // 4. Split response into chunks
    const chunks = this.splitIntoChunks(response)

    // 5. Send chunks with intervals
    for (let i = 0; i < chunks.length; i++) {
      callback.onChunk(chunks[i], i, chunks.length)
      if (i < chunks.length - 1) {
        await delay(this.config.chunkInterval)
      }
    }

    // 6. Reset status to idle
    callback.onStatusChange('idle')

    return chunks
  }

  private splitIntoChunks(text: string): string[] {
    // Split by paragraphs first
    const paragraphs = text.split('\n\n').filter(p => p.trim())

    if (paragraphs.length <= 1) {
      // If only one paragraph, split by sentences
      return this.splitBySentences(text)
    }

    // Group paragraphs into chunks of reasonable size
    const chunks: string[] = []
    let currentChunk = ''

    for (const paragraph of paragraphs) {
      if (currentChunk.length + paragraph.length > 500 && currentChunk) {
        chunks.push(currentChunk.trim())
        currentChunk = paragraph
      } else {
        currentChunk += (currentChunk ? '\n\n' : '') + paragraph
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk.trim())
    }

    return chunks.length > 0 ? chunks : [text]
  }

  private splitBySentences(text: string): string[] {
    // Split by sentence endings
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]

    const chunks: string[] = []
    let currentChunk = ''

    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length > 300 && currentChunk) {
        chunks.push(currentChunk.trim())
        currentChunk = sentence
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk.trim())
    }

    return chunks.length > 0 ? chunks : [text]
  }

  getEstimatedDuration(responseLength: number): number {
    const baseDuration =
      this.config.initialDelay.max +
      this.config.calculatingDuration +
      this.config.typingDuration.max

    // Estimate chunks based on length
    const estimatedChunks = Math.ceil(responseLength / 400)
    const chunkDuration = (estimatedChunks - 1) * this.config.chunkInterval

    return baseDuration + chunkDuration
  }
}

// Singleton instance
let pacer: HumanizationPacer | null = null

export function getHumanizationPacer(): HumanizationPacer {
  if (!pacer) {
    pacer = new HumanizationPacer()
  }
  return pacer
}
