import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './pages/album-list/album-list.component';
import { AlbumDetailsComponent } from './pages/album-details/album-details.component';

const routes: Routes = [  
  {
    path: '',
    component: AlbumListComponent
  },
  {
    path: ':id',
    component: AlbumDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
