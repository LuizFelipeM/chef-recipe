import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-information',
  templateUrl: './main-information.component.html',
  styleUrl: './main-information.component.scss'
})
export class MainInformationComponent {
  @Input() title?: string
  @Input() sourceUrl?: string
  @Input() sourceName?: string
  @Input() imageSource?: string
  @Input() readyInMinutes?: number
  @Input() servings?: number
  @Input() diets?: string[]
  @Input() dishTypes?: string[]
  @Input()
  set score(score: number | undefined) {
    this.fillScoreStars(score)
  }

  scoreStars: string[] = new Array(5).fill("")

  private fillScoreStars(score?: number) {
    const scoreStar = score && score > 1 ? score / 100 : 0
    this.scoreStars = this.scoreStars.map((_, i, arr) => (
      i + 1 < arr.length * scoreStar ?
        "fa-solid fa-star" :
        scoreStar % 1 >= 0.5 ?
          "fa-regular fa-star-half-stroke" :
          "fa-regular fa-star"
    ))
  }
}
