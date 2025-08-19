import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimService } from 'projects/micro-animations/src/public-api';

@Component({
  selector: 'app-demo-anim-button',
  templateUrl: './demo-anim-button.component.html',
  styleUrl: './demo-anim-button.component.scss'
})
export class DemoAnimButtonComponent {
  // Original button for the scaling animation
  @ViewChild('btnScale', { static: true }) btnScale!: ElementRef<HTMLButtonElement>;

  // New button for the popping animation
  @ViewChild('btnPop', { static: true }) btnPop!: ElementRef<HTMLButtonElement>;

  // New buttons for daily-use animations
  @ViewChild('btnShake', { static: true }) btnShake!: ElementRef<HTMLButtonElement>;
  @ViewChild('btnPulse', { static: true }) btnPulse!: ElementRef<HTMLButtonElement>;
  @ViewChild('btnSlideIn', { static: true }) btnSlideIn!: ElementRef<HTMLButtonElement>;
  @ViewChild('btnTextSlide', { static: true }) btnTextSlide!: ElementRef<HTMLButtonElement>;
  isProcessing = false;
  buttonText = 'Sign Up';
  constructor(private anim: AnimService) { }

  async animateScale() {
    await this.anim.animate(
      this.btnScale.nativeElement,
      [
        { transform: 'scale(1)', offset: 0 },
        { transform: 'scale(1.06)', offset: 0.6 },
        { transform: 'scale(1)', offset: 1 }
      ],
      { duration: 280 }
    );
  }

  async animatePop() {
    await this.anim.animate(
      this.btnPop.nativeElement,
      [
        { transform: 'translateY(0)', backgroundColor: 'transparent', offset: 0 },
        { transform: 'translateY(-10px)', backgroundColor: 'rgba(255, 0, 0, 0.2)', offset: 0.5 },
        { transform: 'translateY(0)', backgroundColor: 'transparent', offset: 1 }
      ],
      { duration: 400, easing: 'ease-in-out' }
    );
  }

  // Daily-use animation 1: Shake for invalid input
  async animateShake() {
    await this.anim.animate(
      this.btnShake.nativeElement,
      [
        { transform: 'translateX(0)', offset: 0 },
        { transform: 'translateX(-10px)', offset: 0.2 },
        { transform: 'translateX(10px)', offset: 0.4 },
        { transform: 'translateX(-10px)', offset: 0.6 },
        { transform: 'translateX(10px)', offset: 0.8 },
        { transform: 'translateX(0)', offset: 1 }
      ],
      { duration: 500 }
    );
  }

  // Daily-use animation 2: Pulse for notifications or active states
  async animatePulse() {
    await this.anim.animate(
      this.btnPulse.nativeElement,
      [
        { transform: 'scale(1)', offset: 0 },
        { transform: 'scale(1.1)', offset: 0.5 },
        { transform: 'scale(1)', offset: 1 }
      ],
      { duration: 1000, iterations: Infinity }
    );
  }

  // Daily-use animation 3: Slide-in for new content
  async animateSlideIn() {
    await this.anim.animate(
      this.btnSlideIn.nativeElement,
      [
        { transform: 'translateX(-100%)', opacity: 0, offset: 0 },
        { transform: 'translateX(0)', opacity: 1, offset: 1 }
      ],
      { duration: 500, easing: 'ease-out' }
    );
  }



  // New animation method for a "text-slide" effect
  async animateTextSlide() {
    if (this.isProcessing) {
      return; // Prevent multiple clicks
    }
    this.isProcessing = true;

    // Animate the text sliding out
    await this.anim.animate(
      this.btnTextSlide.nativeElement,
      [
        { transform: 'translateX(0)', opacity: 1 },
        { transform: 'translateX(-100%)', opacity: 0 }
      ],
      { duration: 200, easing: 'ease-in' }
    );

    // Swap the text content
    this.buttonText = 'Loading...';

    // Animate the new text sliding in
    await this.anim.animate(
      this.btnTextSlide.nativeElement,
      [
        { transform: 'translateX(100%)', opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 }
      ],
      { duration: 200, easing: 'ease-out' }
    );

    // Simulate an API call
    setTimeout(() => {
      this.isProcessing = false;
      this.buttonText = 'Sign Up';
    }, 2000);
  }
}