// projects/micro-animations/src/lib/micro-animations.module.ts
import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  MICRO_ANIMATIONS_CONFIG,
  MicroAnimationsConfig,
  DEFAULT_MICRO_ANIM_CONFIG
} from './tokens/config.token';

@NgModule({
  // no declarations yet (directives will be added in later days)
})
export class MicroAnimationsModule {
  /**
   * Provide a custom config for the library.
   * Usage: MicroAnimationsModule.forRoot({ useGsap: true, defaultDuration: 300 })
   */
  static forRoot(config?: MicroAnimationsConfig): ModuleWithProviders<MicroAnimationsModule> {
    return {
      ngModule: MicroAnimationsModule,
      providers: [
        {
          provide: MICRO_ANIMATIONS_CONFIG,
          useValue: { ...DEFAULT_MICRO_ANIM_CONFIG, ...(config || {}) }
        }
      ]
    };
  }
}
