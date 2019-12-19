import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossfadePage } from './crossfade.page';

describe('CrossfadePage', () => {
  let component: CrossfadePage;
  let fixture: ComponentFixture<CrossfadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossfadePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossfadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
