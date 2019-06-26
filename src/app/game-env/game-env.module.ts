import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GameEnvPage } from './game-env.page';

//Compass Component
import { CompassComponent } from '../componets/compass/compass.component';

const routes: Routes = [
  {
    path: '',
    component: GameEnvPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    GameEnvPage, 
    CompassComponent,
  ]
})
export class GameEnvPageModule {}
