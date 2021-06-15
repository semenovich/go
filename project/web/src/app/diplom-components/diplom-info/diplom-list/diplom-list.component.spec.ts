import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomListComponent } from './diplom-list.component';

describe('DiplomListComponent', () => {
  let component: DiplomListComponent;
  let fixture: ComponentFixture<DiplomListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
