export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

/**
 * Strips AI "thinking" or "reasoning" blocks from the response.
 * Some models return thoughts in <thought>...</thought> or "Thinking process: ..."
 */
function stripReasoning(text: string): string {
  // Remove <thought>...</thought> blocks
  let cleaned = text.replace(/<thought>[\s\S]*?<\/thought>/gi, "").trim();
  
  // Remove common reasoning prefixes
  const reasoningPrefixes = [
    /^Thinking process:[\s\S]*?\n\n/i,
    /^Here's a thinking process:[\s\S]*?\n\n/i,
    /^Reasoning:[\s\S]*?\n\n/i,
  ];
  
  for (const prefix of reasoningPrefixes) {
    if (prefix.test(cleaned)) {
      cleaned = cleaned.replace(prefix, "").trim();
    }
  }
  
  return cleaned || "Namaste. Please ask me something about your destiny.";
}

export async function generateVedicResponse(
  systemPrompt: string,
  userMessage: string,
  history: ChatHistoryItem[] = []
) {
  // SECURITY: HARDCODED KEY REMOVED. Using only Environment Variables.
  const apiKey = process.env.NVIDIA_API_KEY || process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    console.error("CRITICAL: AI API Key is missing in Vercel Environment Variables.");
    return "Namaste. The cosmic connection is currently interrupted. Please contact the Acharya.";
  }

  const formattedHistory = history.map((h) => ({
    role: h.role,
    content: h.content,
  }));

  // Swapping 429'd models for more stable ones
  const candidateModels = [
    "nvidia/nemotron-3.5-lightning:free",
    "meta-llama/llama-3.1-8b-instruct:free",
    "google/gemma-2-9b-it:free",
  ];

  for (const model of candidateModels) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://jyotish-vani-zeta.vercel.app",
          "X-Title": "Jyotish Vani AI Consultation",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            ...formattedHistory,
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return stripReasoning(content);
        }
      }
    } catch (e) {
      console.error(`Attempt with model ${model} failed:`, e);
    }
  }

  return "Namaste. The cosmic energies are currently turbulent. Please try again in a moment.";
}
