import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReinscriptionComponent } from './student-reinscription.component';

describe('StudentReinscriptionComponent', () => {
  let component: StudentReinscriptionComponent;
  let fixture: ComponentFixture<StudentReinscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentReinscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentReinscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
