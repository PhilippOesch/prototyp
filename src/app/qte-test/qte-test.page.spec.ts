import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QteTestPage } from './qte-test.page';

describe('QteTestPage', () => {
  let component: QteTestPage;
  let fixture: ComponentFixture<QteTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QteTestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QteTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
