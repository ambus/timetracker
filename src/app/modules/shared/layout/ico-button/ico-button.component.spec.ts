import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoButtonComponent } from './ico-button.component';

describe('IcoButtonComponent', () => {
  let component: IcoButtonComponent;
  let fixture: ComponentFixture<IcoButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
