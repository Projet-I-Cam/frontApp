import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListHomeworksComponent } from './student-list-homeworks.component';

describe('StudentListHomeworksComponent', () => {
  let component: StudentListHomeworksComponent;
  let fixture: ComponentFixture<StudentListHomeworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentListHomeworksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentListHomeworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
