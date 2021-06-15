import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomReviewerComponent } from './diplom-reviewer.component';

describe('DiplomReviewerComponent', () => {
  let component: DiplomReviewerComponent;
  let fixture: ComponentFixture<DiplomReviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomReviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
