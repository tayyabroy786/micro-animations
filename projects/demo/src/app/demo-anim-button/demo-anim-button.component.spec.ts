import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAnimButtonComponent } from './demo-anim-button.component';

describe('DemoAnimButtonComponent', () => {
  let component: DemoAnimButtonComponent;
  let fixture: ComponentFixture<DemoAnimButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoAnimButtonComponent]
    });
    fixture = TestBed.createComponent(DemoAnimButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
