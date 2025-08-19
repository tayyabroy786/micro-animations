import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoDirectiveCardsComponent } from './demo-directive-cards.component';

describe('DemoDirectiveCardsComponent', () => {
  let component: DemoDirectiveCardsComponent;
  let fixture: ComponentFixture<DemoDirectiveCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoDirectiveCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoDirectiveCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
