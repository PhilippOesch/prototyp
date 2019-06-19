import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStaticPage } from './game-static.page';

describe('GameStaticPage', () => {
  let component: GameStaticPage;
  let fixture: ComponentFixture<GameStaticPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStaticPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStaticPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
