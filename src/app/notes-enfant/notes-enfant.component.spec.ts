import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesEnfantComponent } from './notes-enfant.component';

describe('NotesEnfantComponent', () => {
  let component: NotesEnfantComponent;
  let fixture: ComponentFixture<NotesEnfantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesEnfantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
