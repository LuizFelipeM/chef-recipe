import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { AnalyzedInstructionsStep } from '../types/AnalyzedInstructions';
import { Subscription } from 'rxjs';
import { api, getRouteParams, routes, state } from '@Chef/utility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  public recipe?: RecipeWithInformation
  public steps: AnalyzedInstructionsStep[] = []
  public scoreStars: string[] = new Array(5).fill("")

  private subs!: Subscription

  constructor(private cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.subs = state
      .subscribe(({ recipe }) => {
        this.setRecipe(recipe)
        if (recipe) {
          this.cdr.detectChanges()
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      })
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe()
    state.next({ recipe: undefined })
  }

  private getParamId(): number {
    return Number(getRouteParams(routes["RECIPE"])["id"])
  }

  private async getRecipe(id: number): Promise<RecipeWithInformation> {
    return await api.recipes.getInformation(Number(id))
  }

  private setRecipe(recipe: RecipeWithInformation | undefined) {
    const paramId = this.getParamId()
    if (recipe && paramId === recipe.id) {
      this.recipe = recipe
      this.steps = recipe.analyzedInstructions?.flatMap(ai => ai.steps).sort((s1, s2) => s1.number - s2.number) ?? []
    } else {
      this.getRecipe(paramId)
        .then((recipe) => state.next({ recipe }))
        .catch(console.error)
    }
  }
}
