import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinEnfantComponent } from './bulletin-enfant.component';

describe('BulletinEnfantComponent', () => {
  let component: BulletinEnfantComponent;
  let fixture: ComponentFixture<BulletinEnfantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulletinEnfantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulletinEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
