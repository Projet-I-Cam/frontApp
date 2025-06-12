import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleveNotesComponent } from './releve-notes.component';

describe('ReleveNotesComponent', () => {
  let component: ReleveNotesComponent;
  let fixture: ComponentFixture<ReleveNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleveNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleveNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
