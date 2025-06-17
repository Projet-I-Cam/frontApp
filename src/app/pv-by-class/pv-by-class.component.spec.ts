import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvByClassComponent } from './pv-by-class.component';

describe('PvByClassComponent', () => {
  let component: PvByClassComponent;
  let fixture: ComponentFixture<PvByClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PvByClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PvByClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
