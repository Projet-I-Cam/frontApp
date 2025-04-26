import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsAffectationComponent } from './staffs-affectation.component';

describe('StaffsAffectationComponent', () => {
  let component: StaffsAffectationComponent;
  let fixture: ComponentFixture<StaffsAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffsAffectationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffsAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
