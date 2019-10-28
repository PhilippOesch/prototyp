import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QteComponent } from './qte.component';

describe('QteComponent', () => {
  let component: QteComponent;
  let fixture: ComponentFixture<QteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QteComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
