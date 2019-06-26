import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KompassPage } from './kompass.page';

describe('KompassPage', () => {
  let component: KompassPage;
  let fixture: ComponentFixture<KompassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KompassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KompassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
