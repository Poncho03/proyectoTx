import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule) },
  { path: 'registros', loadChildren: () => import('./pages/registros/registros.module').then( m => m.RegistrosPageModule) },
  { path: 'ajustes', loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule) },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
