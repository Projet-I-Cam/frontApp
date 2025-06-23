import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContentInfoComponent } from './dashboard-content-info.component';

describe('DashboardContentInfoComponent', () => {
  let component: DashboardContentInfoComponent;
  let fixture: ComponentFixture<DashboardContentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardContentInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardContentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
