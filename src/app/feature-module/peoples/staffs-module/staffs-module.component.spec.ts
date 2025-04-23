import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsModuleComponent } from './staffs-module.component';

describe('StaffsModuleComponent', () => {
  let component: StaffsModuleComponent;
  let fixture: ComponentFixture<StaffsModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffsModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
