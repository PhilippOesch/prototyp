import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'game-env', loadChildren: './game-env/game-env.module#GameEnvPageModule' },
  { path: 'game-static', loadChildren: './game-static/game-static.module#GameStaticPageModule' },  { path: 'qte-test', loadChildren: './qte-test/qte-test.module#QteTestPageModule' },
  { path: 'qte-button-test', loadChildren: './qte-button-test/qte-button-test.module#QteButtonTestPageModule' },
  { path: 'crossfade', loadChildren: './crossfade/crossfade.module#CrossfadePageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
