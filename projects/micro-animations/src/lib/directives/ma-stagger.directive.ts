import {
  Directive,
  Input,
  QueryList,
  ContentChildren,
  AfterContentInit,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { AnimService } from '../services/anim.service';
import { MaAppearDirective } from './ma-appear.directive';

type MaybeAnimation = Animation | any | null;

@Directive({
  selector: '[maStagger]',
  standalone: true,
  host: {
    // We add a class to the host element to allow for targeted CSS in the demo
    '[class.ma-stagger-container]': 'true',
  },
})
export class MaStaggerDirective implements AfterContentInit, OnDestroy {
  // The delay between each child animation in milliseconds
  @Input('maStagger') delay: number = 50;

  // Query for all children that have the maAppear directive
  @ContentChildren(MaAppearDirective, { descendants: true })
  private maAppearChildren!: QueryList<MaAppearDirective>;

  private runningAnimations: MaybeAnimation[] = [];

  constructor(private animService: AnimService) {}

  ngAfterContentInit() {
    // Only run the stagger if there are children to animate
    if (this.maAppearChildren && this.maAppearChildren.length > 0) {
      // Wait for a short time to ensure the elements have been rendered
      // and the initial styles are applied before we start the stagger
      setTimeout(() => {
        this.maAppearChildren.forEach((child, index) => {
          const staggerDelay = index * this.delay;
          // Use the `setTimeout` to manually create the stagger effect
          setTimeout(() => {
            const el = child.el.nativeElement;
            
            // Check if the element is currently visible in the viewport before animating
            const rect = el.getBoundingClientRect();
            const isInView = rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);

            if (isInView) {
                // The child element has already been set to a hidden state by maAppear
                // We'll use the animService to play the animation and capture the promise
                const animPromise = this.animService.animate(
                    el,
                    // Get the keyframes from the child's preset
                    // You'll need to export the `appearPresetToProps` function from the ma-appear directive
                    // to access it here. For now, we'll hardcode a simple example.
                    [{ opacity: '0', transform: 'translateY(20px)' }, { opacity: '1', transform: 'translateY(0)' }],
                    child.options,
                );
                // Store the animation instance for cleanup
                if (animPromise) {
                    this.runningAnimations.push(animPromise);
                    animPromise.then((anim) => {
                        // Once finished, remove from the list
                        const idx = this.runningAnimations.indexOf(anim);
                        if (idx > -1) {
                            this.runningAnimations.splice(idx, 1);
                        }
                    });
                }
            }
          }, staggerDelay);
        });
      }, 50); // A small initial delay
    }
  }

  ngOnDestroy() {
    // Clean up any running animations to prevent memory leaks
    this.runningAnimations.forEach((anim) => {
      this.animService.stopAnimation(anim);
    });
    this.runningAnimations = [];
  }
}
