import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomCommissionComponent } from './diplom-commission.component';

describe('DiplomCommissionComponent', () => {
  let component: DiplomCommissionComponent;
  let fixture: ComponentFixture<DiplomCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
