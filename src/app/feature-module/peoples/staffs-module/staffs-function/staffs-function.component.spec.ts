import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsFunctionComponent } from './staffs-function.component';

describe('StaffsFunctionComponent', () => {
  let component: StaffsFunctionComponent;
  let fixture: ComponentFixture<StaffsFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffsFunctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffsFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
