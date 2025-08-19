import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AnimService } from '../services/anim.service';

type MaybeAnimation = Animation | any | null;

/**
 * @description
 * Maps a preset name to a set of animation keyframes for 'appear' animations.
 * This function has been updated to include the 'slide-in-right' and 'slide-in-left' presets.
 */
const appearPresetToProps = (preset: string) => {
  switch (preset) {
    case 'slide-up-sm':
      return [
        { opacity: 0, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ];
    case 'fade':
      return [{ opacity: 0 }, { opacity: 1 }];
    case 'slide-in-right':
      return [
        { opacity: 0, transform: 'translateX(50px)' },
        { opacity: 1, transform: 'translateX(0)' },
      ];
    case 'slide-in-left':
      return [
        { opacity: 0, transform: 'translateX(-50px)' },
        { opacity: 1, transform: 'translateX(0)' },
      ];
    default:
      return [];
  }
};

@Directive({
  selector: '[maAppear]',
  standalone: true, // Use standalone: true for modern Angular
})
export class MaAppearDirective implements OnInit, OnDestroy {
  // The preset name for the animation when the element appears
  @Input('maAppear') preset: string = 'slide-up-sm';

  // Optional overrides for duration, easing, etc.
  @Input('maAppearOptions') options: any = {};

  // Emits when the element has finished appearing
  @Output() appeared = new EventEmitter<void>();

  private observer!: IntersectionObserver;
  private hasAppeared = false;
  private currentAnimation: MaybeAnimation | null = null;

  constructor(
    public el: ElementRef<HTMLElement>, // `public` is needed so it can be accessed by the maStagger directive
    private animService: AnimService,
  ) {}

  ngOnInit() {
    // Get the initial keyframe properties for the hidden state
    const keyframes = appearPresetToProps(this.preset);
    if (keyframes.length > 0) {
      // Apply the properties from the first keyframe to the element's style
      const firstKeyframe = keyframes[0];
      if (firstKeyframe) {
        Object.assign(this.el.nativeElement.style, firstKeyframe);
      }
    }

    // Use a passive event listener for better performance
    // The `root` is the viewport, and the `threshold` is the percentage of visibility required
    this.observer = new IntersectionObserver(
      (entries) => {
        // Only run if the element has not appeared yet
        if (entries[0].isIntersecting && !this.hasAppeared) {
          this.hasAppeared = true;

          // Get the keyframes for the "in" animation
          const animationKeyframes = appearPresetToProps(this.preset);
          if (animationKeyframes.length === 0) {
              this.observer.disconnect();
              return;
          }

          // Use the AnimService to run the animation
          this.currentAnimation = this.animService.animate(
            this.el.nativeElement,
            animationKeyframes,
            this.options,
          );

          // Emit the output when the animation is finished
          if (this.currentAnimation) {
            (this.currentAnimation as Promise<any>).then(() => {
              this.appeared.emit();
            });
          }

          // Stop observing after the animation has started
          this.observer.disconnect();
        }
      },
      { threshold: 0.1 }, // Trigger when 10% of the element is visible
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    // Disconnect the observer when the directive is destroyed
    if (this.observer) {
      this.observer.disconnect();
    }
    // Clean up any running animation
    if (this.currentAnimation) {
      this.animService.stopAnimation(this.currentAnimation);
    }
  }
}
