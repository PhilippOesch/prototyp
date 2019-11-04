import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QteButtonTestPage } from './qte-button-test.page';

const routes: Routes = [
  {
    path: '',
    component: QteButtonTestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QteButtonTestPage]
})
export class QteButtonTestPageModule {}
