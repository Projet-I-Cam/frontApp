import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInfosComponent } from './student-infos.component';

describe('StudentInfosComponent', () => {
  let component: StudentInfosComponent;
  let fixture: ComponentFixture<StudentInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
