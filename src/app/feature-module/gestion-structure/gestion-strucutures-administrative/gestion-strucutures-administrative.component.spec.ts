import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionStrucuturesAdministrativeComponent } from './gestion-strucutures-administrative.component';

describe('GestionStrucuturesAdministrativeComponent', () => {
  let component: GestionStrucuturesAdministrativeComponent;
  let fixture: ComponentFixture<GestionStrucuturesAdministrativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionStrucuturesAdministrativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionStrucuturesAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
