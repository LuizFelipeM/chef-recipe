export interface BaseIngredient {
  id: number
  amount: number
  unit: string
  aisle: string
  name: string
  original: string
  originalName: string
  meta: string[],
  image: string
}

export interface Ingredient extends BaseIngredient {
  unitLong: string
  unitShort: string
  extendedName: string
}

export interface ExtendedIngredient extends BaseIngredient {
  nameClean?: string
  consistency: string
  measures: Measure
}

export interface Measure {
  metric: Metric
  us: Metric
}

export interface Metric {
  amount: number
  unitLong: string
  unitShort: string
}