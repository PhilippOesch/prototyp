import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QteBarComponent } from './qte-bar.component';

describe('QteBarComponent', () => {
  let component: QteBarComponent;
  let fixture: ComponentFixture<QteBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QteBarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QteBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
