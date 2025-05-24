import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAbscenceListComponent } from './students-abscence-list.component';

describe('StudentsAbscenceListComponent', () => {
  let component: StudentsAbscenceListComponent;
  let fixture: ComponentFixture<StudentsAbscenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsAbscenceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsAbscenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
