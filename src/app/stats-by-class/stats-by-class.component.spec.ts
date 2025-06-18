import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsByClassComponent } from './stats-by-class.component';

describe('StatsByClassComponent', () => {
  let component: StatsByClassComponent;
  let fixture: ComponentFixture<StatsByClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsByClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsByClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
