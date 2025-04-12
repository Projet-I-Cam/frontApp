import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeDivisionComponent } from './administrative-division.component';

describe('AdministrativeDivisionComponent', () => {
  let component: AdministrativeDivisionComponent;
  let fixture: ComponentFixture<AdministrativeDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrativeDivisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrativeDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 