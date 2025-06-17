import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevesByClassComponent } from './releves-by-class.component';

describe('RelevesByClassComponent', () => {
  let component: RelevesByClassComponent;
  let fixture: ComponentFixture<RelevesByClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelevesByClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelevesByClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
