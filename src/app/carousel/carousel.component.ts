import { Component, ElementRef, OnInit } from '@angular/core';
import { singleSpaPropsSubject } from '../../single-spa/single-spa-props';

@Component({
  selector: 'app-carousel',
  template: '<div #svelteApp></div>'
})
export class CarouselComponent implements OnInit {
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    singleSpaPropsSubject.subscribe((props) => {
      import('@Chef/carousel').then((module) => {
        module.mount({
          domElement: this.el.nativeElement.querySelector('#svelteApp'),
          ...props,
        })
      })
    })
  }
}
