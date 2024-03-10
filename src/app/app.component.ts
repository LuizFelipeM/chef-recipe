import { Component, Input } from '@angular/core';
import { AnalyzedInstructionsStep } from '../types/AnalyzedInstructions';
import { Subscription } from 'rxjs';
import { api, getRouteParams, routes, state } from '@Chef/utility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @Input() recipe?: RecipeWithInformation
  @Input() steps: AnalyzedInstructionsStep[] = []
  @Input() scoreStars: string[] = new Array(5).fill("")

  stateSub!: Subscription

  ngOnInit(): void {
    let reloadRecipe = false
    const id = Number(getRouteParams(routes["RECIPE"])["id"])

    this.stateSub = state.subscribe(({ recipe }) => {
      try {
        this.setRecipe(recipe)
        reloadRecipe = id !== this.recipe?.id
      } catch (error) {
        reloadRecipe = true
      }
    })

    if (!this.recipe || reloadRecipe)
      this.getRecipe(id)
  }

  ngOnDestroy(): void {
    this.stateSub.unsubscribe()
    state.next({ recipe: undefined })
  }

  async getRecipe(id: number) {
    try {
      const recipe = await api.recipes.getInformation(Number(id))
      this.setRecipe(recipe)
    } catch (error) {
      console.error(error)
    }
  }

  setRecipe(recipe?: RecipeWithInformation) {
    if (!recipe)
      throw new Error("Cannot set an empty recipe")

    this.recipe = recipe
    this.steps = recipe.analyzedInstructions.flatMap(ai => ai.steps).sort((s1, s2) => s1.number - s2.number)
  }
}
