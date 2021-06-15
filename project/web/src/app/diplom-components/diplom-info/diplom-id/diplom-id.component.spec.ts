import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomIdComponent } from './diplom-id.component';

describe('DiplomIdComponent', () => {
  let component: DiplomIdComponent;
  let fixture: ComponentFixture<DiplomIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
