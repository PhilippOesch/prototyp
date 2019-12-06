import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QteButtonTestPage } from './qte-button-test.page';

//Added Components
import { QteButtonComponent } from '../components/qte-button/qte-button.component';

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
  declarations: [QteButtonTestPage, QteButtonComponent]
})
export class QteButtonTestPageModule {}
