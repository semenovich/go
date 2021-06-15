import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomOrderComponent } from './diplom-order.component';

describe('DiplomOrderComponent', () => {
  let component: DiplomOrderComponent;
  let fixture: ComponentFixture<DiplomOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
