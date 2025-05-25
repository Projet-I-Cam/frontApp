import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUnregisteredListComponent } from './student-unregistered-list.component';

describe('StudentUnregisteredListComponent', () => {
  let component: StudentUnregisteredListComponent;
  let fixture: ComponentFixture<StudentUnregisteredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentUnregisteredListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentUnregisteredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
