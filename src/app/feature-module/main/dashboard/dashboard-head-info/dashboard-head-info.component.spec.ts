import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHeadInfoComponent } from './dashboard-head-info.component';

describe('DashboardHeadInfoComponent', () => {
  let component: DashboardHeadInfoComponent;
  let fixture: ComponentFixture<DashboardHeadInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardHeadInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHeadInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
