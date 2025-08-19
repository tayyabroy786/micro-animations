import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { AnimService } from '../services/anim.service';
import { CommonModule } from '@angular/common';

/**
 * @description
 * Maps a preset name to a set of animation keyframes.
 * This can be expanded to include more presets.
 */
const presetToProps = (preset: string) => {
  switch (preset) {
    case 'pop':
      return [{ transform: 'scale(1)' }, { transform: 'scale(1.07)' }];
    case 'jiggle':
      return [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(5deg)' },
        { transform: 'rotate(-5deg)' },
        { transform: 'rotate(0deg)' },
      ];
    case 'fade':
      return [{ opacity: 1 }, { opacity: 0.5 }];
    default:
      return [];
  }
};

/**
 * @description
 * Applies a hover animation to an element based on a preset.
 */
@Directive({
  selector: '[maHover]',
  standalone: true,
})
export class MaHoverDirective {
  /**
   * @description The name of the animation preset to use (e.g., 'pop').
   */
  @Input('maHover') preset: string = 'pop';

  /**
   * @description Optional custom animation options.
   */
  @Input() maHoverOptions: any = {};

  private enterAnimation: Animation | null = null;
  private exitAnimation: Animation | null = null;

  constructor(private el: ElementRef, private anim: AnimService) {}

  /**
   * @description Listens for the mouseenter event and plays the animation.
   */
  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.exitAnimation) {
      this.exitAnimation.cancel();
    }
    const keyframes = presetToProps(this.preset);
    const options = {
      duration: 180,
      fill: 'forwards',
      easing: 'ease-out',
      ...this.maHoverOptions,
    };
    // Use the animate method from AnimService
    this.anim.animate(this.el.nativeElement, keyframes, options).then((anim) => {
      this.enterAnimation = anim;
    });
  }

  /**
   * @description Listens for the mouseleave event and reverses the animation.
   */
  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.enterAnimation) {
      // Reverses the animation to return to the original state.
      this.anim.animate(
        this.el.nativeElement,
        (this.enterAnimation.effect as KeyframeEffect).getKeyframes() as any,
        {
          duration: 180,
          direction: 'reverse',
          fill: 'forwards',
          easing: 'ease-in-out',
        }
      ).then((anim) => {
        this.exitAnimation = anim;
      });
    }
  }
}