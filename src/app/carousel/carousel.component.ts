import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { singleSpaPropsSubject } from '../../single-spa/single-spa-props';
import { mountParcel } from '../../main.single-spa';
import { Subscription } from 'rxjs';
import carousel from '@Chef/carousel'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnInit, OnDestroy {
  @ViewChild('carousel', { static: true })
  private carouselRef!: ElementRef
  private subscription!: Subscription

  ngOnInit(): void {
    this.subscription = singleSpaPropsSubject.subscribe((props) => {
      mountParcel?.({ ...carousel },
        {
          domElement: this.carouselRef.nativeElement,
          ...props
        })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
