import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompassPointerComponent } from './compass-pointer.component';

describe('CompassPointerComponent', () => {
  let component: CompassPointerComponent;
  let fixture: ComponentFixture<CompassPointerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompassPointerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompassPointerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
