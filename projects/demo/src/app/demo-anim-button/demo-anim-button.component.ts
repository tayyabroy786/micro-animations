import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimService } from 'projects/micro-animations/src/public-api'; // during dev; when published use package name

@Component({
  selector: 'app-demo-anim-button',
  template: `<button #btn class="btn btn-primary" (click)="animate()">Animate</button>`
})
export class DemoAnimButtonComponent {
  @ViewChild('btn', { static: true }) btn!: ElementRef<HTMLButtonElement>;

  constructor(private anim: AnimService) {}

  async animate() {
    await this.anim.animate(
      this.btn.nativeElement,
      [
        { transform: 'scale(1)', offset: 0 },
        { transform: 'scale(1.06)', offset: 0.6 },
        { transform: 'scale(1)', offset: 1 }
      ],
      { duration: 280 }
    );
  }
}
