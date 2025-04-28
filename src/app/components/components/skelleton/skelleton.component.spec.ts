import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkelletonComponent } from './skelleton.component';

describe('SkelletonComponent', () => {
  let component: SkelletonComponent;
  let fixture: ComponentFixture<SkelletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkelletonComponent]
    });
    fixture = TestBed.createComponent(SkelletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
