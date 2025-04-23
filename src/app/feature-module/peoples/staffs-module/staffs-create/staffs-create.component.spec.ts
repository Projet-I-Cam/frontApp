import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsCreateComponent } from './staffs-create.component';

describe('StaffsCreateComponent', () => {
  let component: StaffsCreateComponent;
  let fixture: ComponentFixture<StaffsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffsCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
