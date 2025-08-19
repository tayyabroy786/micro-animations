
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaHoverDirective } from 'projects/micro-animations/src/lib/directives/hover.directive';
import { MaStaggerDirective } from 'projects/micro-animations/src/lib/directives/ma-stagger.directive';
import { MaAppearDirective } from 'projects/micro-animations/src/lib/directives/ma-appear.directive';


/**
 * @description
 * This component showcases how to use the `maHover` and `maAppear` directives.
 */
@Component({
  selector: 'app-demo-directive-cards',
  standalone: true,
  imports: [CommonModule, MaHoverDirective, MaAppearDirective, MaStaggerDirective],
  templateUrl: './demo-directive-cards.component.html',
  styleUrls: ['./demo-directive-cards.component.scss']
})
export class DemoDirectiveCardsComponent {
   showSlideCards: boolean = true;
   
   items = [
    { title: 'Item 1', preset: 'slide-up-sm' },
    { title: 'Item 2', preset: 'fade' },
    { title: 'Item 3', preset: 'slide-up-sm' },
    { title: 'Item 4', preset: 'fade' },
    { title: 'Item 5', preset: 'slide-up-sm' },
    { title: 'Item 6', preset: 'fade' },
    { title: 'Item 7', preset: 'slide-up-sm' },
    { title: 'Item 8', preset: 'fade' },
    { title: 'Item 9', preset: 'slide-up-sm' },
    { title: 'Item 10', preset: 'fade' },
  ];

  // Example data for the new "slide-in-right" animation
  slideItems = [
    { title: 'Slide Left 1', preset: 'slide-in-left' },
    { title: 'Slide Right 2', preset: 'slide-in-right' },
    { title: 'Slide Left 3', preset: 'slide-in-left' },
    { title: 'Slide Right 4', preset: 'slide-in-right' },
    { title: 'Slide Left 5', preset: 'slide-in-left' },
  ];


  
  rerunAnimation() {
    this.showSlideCards = false;
    setTimeout(() => {
      this.showSlideCards = true;
    }, 10);
  }
}
