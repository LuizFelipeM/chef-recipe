import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { state, getRouteParams, routes, api } from '@Chef/utility';
import { AnalyzedInstructionsStep } from '../../types/AnalyzedInstructions';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent implements OnInit, OnDestroy {
  @Input() recipe!: RecipeWithInformation
  @Input() steps!: AnalyzedInstructionsStep[]
  @Input() scoreStars: string[] = new Array(5).fill("")

  stateSub!: Subscription

  ngOnInit(): void {
    let reloadRecipe = false
    const id = Number(getRouteParams(routes["RECIPE"])["id"])

    this.stateSub = state.subscribe(({ recipe }) => {
      this.setRecipe(recipe)
      reloadRecipe = id !== recipe?.id
    })

    if (!this.recipe || reloadRecipe)
      this.getRecipe(id)

    this.fillScoreStars(this.recipe.spoonacularScore / 100)
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
      return;

    this.steps = recipe.analyzedInstructions.flatMap(ai => ai.steps).sort((s1, s2) => s1.number - s2.number)
    this.recipe = recipe
  }

  fillScoreStars(score: number) {
    this.scoreStars = this.scoreStars.map((_, i, arr) => (
      i + 1 < arr.length * score ?
        "fa-solid fa-star" :
        score % 1 >= 0.5 ?
          "fa-regular fa-star-half-stroke" :
          "fa-regular fa-star"
    ))
  }
}
