import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentTransfertComponent } from './add-student-transfert.component';

describe('AddStudentTransfertComponent', () => {
  let component: AddStudentTransfertComponent;
  let fixture: ComponentFixture<AddStudentTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStudentTransfertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
