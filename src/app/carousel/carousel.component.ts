import { Component, ElementRef, OnInit } from '@angular/core';
import { singleSpaPropsSubject } from '../../single-spa/single-spa-props';
import { LifeCycles } from 'single-spa';
import { mountParcel } from '../../main.single-spa';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnInit {
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    singleSpaPropsSubject.subscribe((props) => {
      import('@Chef/carousel')
        .then((module: LifeCycles<unknown>) => {
          mountParcel?.({ ...module },
            {
              domElement: this.el.nativeElement.querySelector('#carousel-wrapper'),
              ...props
            })
        })
    })
  }
}
