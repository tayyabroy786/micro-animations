import { TestBed } from '@angular/core/testing';
import { AnimService } from './anim.service';
import { MICRO_ANIMATIONS_CONFIG, DEFAULT_MICRO_ANIM_CONFIG } from '../tokens/config.token';

describe('AnimService', () => {
  let service: AnimService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnimService,
        { provide: MICRO_ANIMATIONS_CONFIG, useValue: DEFAULT_MICRO_ANIM_CONFIG }
      ]
    });
    service = TestBed.inject(AnimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should skip animations when prefers-reduced-motion is true and config respects it', () => {
    // simulate reduced-motion by overriding the flag
    (service as any).shouldReduceMotion = true;
    (service as any).config = { ...service['config'], respectReducedMotion: 'respect' };
    return service.animate(document.createElement('div'), [{ opacity: 0 }, { opacity: 1 }]).then(result => {
      expect(result).toBeNull();
    });
  });
});
