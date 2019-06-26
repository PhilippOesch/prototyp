import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { KompassPage } from './kompass.page';

import { CompassDisplayComponent } from './compass-display/compass-display.component';
import { CompassPointerComponent } from './compass-pointer/compass-pointer.component';

const routes: Routes = [
  {
    path: '',
    component: KompassPage
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
    KompassPage,
    CompassDisplayComponent,
    CompassPointerComponent]
})
export class KompassPageModule {}
