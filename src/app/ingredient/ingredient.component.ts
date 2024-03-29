import { Component, Input } from '@angular/core';
import { ExtendedIngredient } from '../../types/Ingredient';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.scss'
})
export class IngredientComponent {
  @Input() ingredients?: ExtendedIngredient[]
}
