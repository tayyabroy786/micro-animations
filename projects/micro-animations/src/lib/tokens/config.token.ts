// projects/micro-animations/src/lib/tokens/config.token.ts
import { InjectionToken } from '@angular/core';

/**
 * Global configuration for the Micro-Animations library.
 */
export interface MicroAnimationsConfig {
  /** whether to respect user's prefers-reduced-motion */
  respectReducedMotion?: boolean;

  /** try to use GSAP when available (optional dependency) */
  useGsap?: boolean;

  /** default animation duration (ms) */
  defaultDuration?: number;

  /** default easing (CSS easings or GSAP easings) */
  defaultEasing?: string;

   defaultFill?: 'none' | 'forwards' | 'backwards' | 'both'; 
}

/** sensible defaults */
export const DEFAULT_MICRO_ANIM_CONFIG: MicroAnimationsConfig = {
  respectReducedMotion: true,
  useGsap: false,
  defaultEasing: 'ease-out',
  defaultDuration: 300,
  defaultFill: 'forwards' // ✅ Default value
};
/**
 * Injection token for providing MicroAnimationsConfig globally.
 * ProvidedIn: 'root' so consumers don't have to provide this token manually.
 */
export const MICRO_ANIMATIONS_CONFIG = new InjectionToken<MicroAnimationsConfig>(
  'MICRO_ANIMATIONS_CONFIG',
  {
    providedIn: 'root',
    factory: () => DEFAULT_MICRO_ANIM_CONFIG
  }
);
