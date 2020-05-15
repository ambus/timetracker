import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAddComponent } from './reports-add.component';

describe('ReportsAddComponent', () => {
  let component: ReportsAddComponent;
  let fixture: ComponentFixture<ReportsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
