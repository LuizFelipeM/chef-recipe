import { Component, Input } from '@angular/core';
import { AnalyzedInstructionsStep } from '../../types/AnalyzedInstructions';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {
  @Input() step!: AnalyzedInstructionsStep
}
