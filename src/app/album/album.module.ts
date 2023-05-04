import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';
import { SharedModule } from '../shared/shared.module';
import { AlbumListComponent } from './pages/album-list/album-list.component';
import { AlbumFormComponent } from './components/album-form/album-form.component';
import { AlbumDetailsComponent } from './pages/album-details/album-details.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { AlbumService } from './services/album.service';


@NgModule({
  declarations: [
    AlbumComponent,
    AlbumListComponent,
    AlbumFormComponent,
    AlbumDetailsComponent,
    AlbumCardComponent
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    SharedModule
  ],
  providers: [
    AlbumService
  ]
})
export class AlbumModule { }
