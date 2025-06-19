import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsResultsComponent } from './stats-results.component';

describe('StatsResultsComponent', () => {
  let component: StatsResultsComponent;
  let fixture: ComponentFixture<StatsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
