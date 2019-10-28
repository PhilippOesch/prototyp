import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QteTestPage } from './qte-test.page';

//Added Components
import { QteComponent} from '../componets/qte/qte.component';

const routes: Routes = [
  {
    path: '',
    component: QteTestPage
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
    QteTestPage,
    QteComponent
  ]
})
export class QteTestPageModule {}
