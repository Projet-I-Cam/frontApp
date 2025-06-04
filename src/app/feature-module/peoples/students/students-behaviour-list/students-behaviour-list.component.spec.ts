import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsBehaviourListComponent } from './students-behaviour-list.component';

describe('StudentsBehaviourListComponent', () => {
  let component: StudentsBehaviourListComponent;
  let fixture: ComponentFixture<StudentsBehaviourListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsBehaviourListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsBehaviourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
