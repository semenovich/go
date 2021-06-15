import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomSpecialytyComponent } from './diplom-specialyty.component';

describe('DiplomSpecialytyComponent', () => {
  let component: DiplomSpecialytyComponent;
  let fixture: ComponentFixture<DiplomSpecialytyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomSpecialytyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomSpecialytyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
