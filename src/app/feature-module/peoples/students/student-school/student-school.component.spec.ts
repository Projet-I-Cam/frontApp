import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSchoolComponent } from './student-school.component';

describe('StudentSchoolComponent', () => {
  let component: StudentSchoolComponent;
  let fixture: ComponentFixture<StudentSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentSchoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
