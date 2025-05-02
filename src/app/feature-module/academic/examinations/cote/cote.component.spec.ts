import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoteComponent } from './cote.component';

describe('CoteComponent', () => {
  let component: CoteComponent;
  let fixture: ComponentFixture<CoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
