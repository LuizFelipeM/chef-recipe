import { Component, Input } from '@angular/core';
import { AnalyzedInstructionsStep } from '../../types/AnalyzedInstructions';

@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
  styleUrl: './method.component.scss'
})
export class MethodComponent {
  @Input() isRecipeLoaded = false
  @Input() steps: AnalyzedInstructionsStep[] = []
}
