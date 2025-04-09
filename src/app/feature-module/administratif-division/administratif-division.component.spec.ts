import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratifDivisionComponent } from './administratif-division.component';

describe('AdministratifDivisionComponent', () => {
  let component: AdministratifDivisionComponent;
  let fixture: ComponentFixture<AdministratifDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministratifDivisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratifDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
