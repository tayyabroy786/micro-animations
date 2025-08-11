import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroAnimationsComponent } from './micro-animations.component';

describe('MicroAnimationsComponent', () => {
  let component: MicroAnimationsComponent;
  let fixture: ComponentFixture<MicroAnimationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MicroAnimationsComponent]
    });
    fixture = TestBed.createComponent(MicroAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
