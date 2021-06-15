import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomChairmanComponent } from './diplom-chairman.component';

describe('DiplomChairmanComponent', () => {
  let component: DiplomChairmanComponent;
  let fixture: ComponentFixture<DiplomChairmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomChairmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomChairmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
