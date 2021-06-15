import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomDefComponent } from './diplom-def.component';

describe('DiplomDefComponent', () => {
  let component: DiplomDefComponent;
  let fixture: ComponentFixture<DiplomDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomDefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
