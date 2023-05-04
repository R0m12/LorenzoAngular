import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'album',
    pathMatch: 'full'
  },
  {
    path: 'album',
    loadChildren: () => import('./album/album.module').then(m => m.AlbumModule)
  },
  {
    path: 'chanson',
    redirectTo: 'chanson',
    pathMatch: 'full'
  },
  {
    path: 'chanson',
    loadChildren: () => import('./chanson/chanson.module').then(m => m.ChansonModule)
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
