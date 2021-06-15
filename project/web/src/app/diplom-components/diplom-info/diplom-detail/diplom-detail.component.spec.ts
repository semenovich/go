import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomDetailComponent } from './diplom-detail.component';

describe('DiplomDetailComponent', () => {
  let component: DiplomDetailComponent;
  let fixture: ComponentFixture<DiplomDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
