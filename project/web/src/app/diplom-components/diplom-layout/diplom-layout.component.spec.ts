import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomLayoutComponent } from './diplom-layout.component';

describe('DiplomLayoutComponent', () => {
  let component: DiplomLayoutComponent;
  let fixture: ComponentFixture<DiplomLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
