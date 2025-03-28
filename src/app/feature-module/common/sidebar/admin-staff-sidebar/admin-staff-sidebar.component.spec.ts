import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffSidebarComponent } from './admin-staff-sidebar.component';

describe('AdminStaffSidebarComponent', () => {
  let component: AdminStaffSidebarComponent;
  let fixture: ComponentFixture<AdminStaffSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminStaffSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStaffSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
