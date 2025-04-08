import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMinedubComponent } from './dashboard-minedub.component';

describe('DashboardMinedubComponent', () => {
  let component: DashboardMinedubComponent;
  let fixture: ComponentFixture<DashboardMinedubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardMinedubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMinedubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
