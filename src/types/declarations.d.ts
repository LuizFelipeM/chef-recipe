type RecipeWithInformation = import("./Recipe").RecipeWithInformation

declare module "@Chef/utility" {
  export const routes: Record<string, string>
  export const state: import("rxjs").BehaviorSubject<{ recipe?: RecipeWithInformation }>
  export function getRouteParams(route: string): Record<string, string>

  export const api = {
    recipes: {
      getInformation(id: number, includeNutrition = false): Promise<RecipeWithInformation>
    }
  }
}