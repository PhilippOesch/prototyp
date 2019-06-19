import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEnvPage } from './game-env.page';

describe('GameEnvPage', () => {
  let component: GameEnvPage;
  let fixture: ComponentFixture<GameEnvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameEnvPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameEnvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
