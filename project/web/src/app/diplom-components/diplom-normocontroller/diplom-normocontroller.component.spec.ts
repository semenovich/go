import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomNormocontrollerComponent } from './diplom-normocontroller.component';

describe('DiplomNormocontrollerComponent', () => {
  let component: DiplomNormocontrollerComponent;
  let fixture: ComponentFixture<DiplomNormocontrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomNormocontrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomNormocontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
