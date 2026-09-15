export interface BirthChartData {
  lagna: PlanetaryPosition
  sun: PlanetaryPosition
  moon: PlanetaryPosition
  mars: PlanetaryPosition
  mercury: PlanetaryPosition
  jupiter: PlanetaryPosition
  venus: PlanetaryPosition
  saturn: PlanetaryPosition
  rahu: PlanetaryPosition
  ketu: PlanetaryPosition
}

export interface PlanetaryPosition {
  planet: string
  sign: string
  signIndex: number
  degree: number
  house: number
  nakshatra?: string
  nakshatraPada?: number
  isRetrograde: boolean
  isExalted: boolean
  isDebilitated: boolean
}

export interface HousePosition {
  house: number
  sign: string
  signIndex: number
  lord: string
  planets: string[]
}

export interface DashaPeriod {
  planet: string
  startDate: string
  endDate: string
  bhukti: BhuktiPeriod[]
}

export interface BhuktiPeriod {
  planet: string
  startDate: string
  endDate: string
}

export interface TransitPosition {
  planet: string
  currentSign: string
  currentHouse: number
  isRetrograde: boolean
  speed: number
}

export interface ChartAnalysis {
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
  recommendations: string[]
}

export interface Remedies {
  gemstones: GemstoneRemedy[]
  mantras: MantraRemedy[]
  donations: DonationRemedy[]
  rituals: RitualRemedy[]
}

export interface GemstoneRemedy {
  gemstone: string
  metal: string
  finger: string
  weight: string
  day: string
  precautions: string[]
}

export interface MantraRemedy {
  mantra: string
  count: number
  bestTime: string
  days: string[]
}

export interface DonationRemedy {
  item: string
  day: string
  recipient: string
}

export interface RitualRemedy {
  ritual: string
  frequency: string
  instructions: string[]
}
