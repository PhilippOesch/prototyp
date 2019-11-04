import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QteButtonTestPage } from './qte-button-test.page';

describe('QteButtonTestPage', () => {
  let component: QteButtonTestPage;
  let fixture: ComponentFixture<QteButtonTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QteButtonTestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QteButtonTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
