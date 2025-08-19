// projects/micro-animations/src/lib/services/anim.service.ts
import { Injectable, Inject } from '@angular/core';
import {
  MicroAnimationsConfig,
  MICRO_ANIMATIONS_CONFIG,
  DEFAULT_MICRO_ANIM_CONFIG
} from '../tokens/config.token';

type MaybeAnimation = Animation | any | null;

export interface AnimOptions {
  duration?: number;
  easing?: string;
  fill?: string;
  useGsap?: boolean;
  iterations?: number; 
   direction?: PlaybackDirection;
}

@Injectable({ providedIn: 'root' })
export class AnimService {
  private gsap: any | null = null;
  public shouldReduceMotion: boolean;
  private config: MicroAnimationsConfig;

  constructor(@Inject(MICRO_ANIMATIONS_CONFIG) cfg?: MicroAnimationsConfig) {
    // merge defaults with provided config
    this.config = { ...DEFAULT_MICRO_ANIM_CONFIG, ...(cfg || {}) };

    // detect prefers-reduced-motion safely (works in SSR guarded)
    const mq =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    this.shouldReduceMotion = !!(mq && mq.matches);

    // Try to load GSAP dynamically ONLY if user enabled useGsap in config.
    // We perform a non-blocking dynamic import so the library still works without GSAP.
    if (this.config.useGsap && typeof window !== 'undefined') {
      (async () => {
        try {
          // dynamic import so bundlers include GSAP only when it's present
          const mod = await import('gsap');
          // module might export `gsap` or default; normalize
          this.gsap = (mod && (mod.gsap || mod.default)) || mod;
        } catch {
          // ignore if gsap not available
          this.gsap = null;
        }
      })();
    }
  }

  /**
   * Animate an element.
   * - Accepts either Web Animations API keyframes (array or object) or a GSAP-like props object.
   * - Observes global reduced-motion config.
   * - Uses GSAP if available and enabled, otherwise falls back to Web Animations API.
   *
   * @param el DOM element
   * @param keyframes Keyframes (Web Animations API style) or GSAP props object
   * @param options overrides: { duration (ms), easing, fill, useGsap (boolean) }
   */
  animate(
    el: Element,
    keyframes: Keyframe[] | PropertyIndexedKeyframes | any,
    options: AnimOptions 
  ): Promise<MaybeAnimation> {
    // Respect user OS reduced-motion preference (if config says 'respect')
    if (this.shouldReduceMotion && this.config.respectReducedMotion ) {
      return Promise.resolve(null);
    }

    const duration = options.duration ?? this.config.defaultDuration ?? 200;
    const easing = options.easing ?? this.config.defaultEasing ?? 'ease';
    const fill = options.fill ?? 'forwards';

    const preferGsap = !!(this.gsap && (options.useGsap ?? this.config.useGsap));

    // If GSAP is available and preferred, attempt to use it.
    if (preferGsap && this.gsap) {
      return new Promise(resolve => {
        // If the passed keyframes is an array (WAAPI style), convert to a GSAP props object:
        let props: any = {};
        if (Array.isArray(keyframes) && keyframes.length) {
          // take the last frame (final styles) as the target props (common pattern)
          props = { ...(keyframes[keyframes.length - 1] as any) };
        } else if (typeof keyframes === 'object') {
          // assume object is already gsap props
          props = { ...keyframes };
        }
        // GSAP expects duration in seconds
        const gsapDuration = Math.max(0.001, duration / 1000);

        // attach ease if not already set
        if (!props.ease) {
          props.ease = easing;
        }

        try {
          const tween = this.gsap.to(el, { ...props, duration: gsapDuration, onComplete: () => resolve(tween) });
        } catch {
          // fallback: resolve null so caller can continue
          resolve(null);
        }
      });
    }

    // Fallback: Web Animations API
    type FillMode = 'none' | 'forwards' | 'backwards' | 'both';

    // Note: It's safer to not use a type assertion directly here if possible.
    // This example assumes options might not have a strong type.
    // A better long-term solution is to ensure `options` is typed correctly.
    const fillValue: FillMode =
      (options.fill as FillMode) ??
      (this.config?.defaultFill as FillMode) ??
      'forwards';

    try {
      // Destructure the 'fill' property from options to prevent
      // it from being spread into the animation configuration
      // and causing a type conflict.
      const { fill: optionsFill, ...restOfOptions } = options;

      const anim = (el as HTMLElement).animate(keyframes as any, {
        duration,
        easing,
        fill: fillValue,
        iterations: options.iterations,
      });
      return anim.finished.then(() => anim);
    } catch (err) {
      if (keyframes && Array.isArray(keyframes) && keyframes.length) {
        const last = keyframes[keyframes.length - 1];
        Object.assign((el as HTMLElement).style, last as any);
      }
      return Promise.resolve(null);
    }
  }


  /**
   * Safely stop/cancel a previously returned animation (web animation or GSAP tween).
   */
  stopAnimation(anim: any) {
    if (!anim) return;
    try {
      if (typeof anim.cancel === 'function') {
        anim.cancel();
      } else if (typeof anim.kill === 'function') {
        // GSAP tween
        anim.kill();
      }
    } catch {
      // ignore
    }
  }
}
