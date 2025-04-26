import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsDetailsComponent } from './staffs-details.component';

describe('StaffsDetailsComponent', () => {
  let component: StaffsDetailsComponent;
  let fixture: ComponentFixture<StaffsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
