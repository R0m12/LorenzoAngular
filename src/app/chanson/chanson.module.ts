import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChansonRoutingModule } from './chanson-routing.module';
import { ChansonComponent } from './chanson.component';
import { SharedModule } from '../shared/shared.module';
import { ChansonListComponent } from './pages/chanson-list/chanson-list.component';
import { ChansonFormComponent } from './components/chanson-form/chanson-form.component';
import { ChansonService } from './services/chanson.service';


@NgModule({
  declarations: [
    ChansonComponent,
    ChansonListComponent,
    ChansonFormComponent,
  ],
  imports: [
    CommonModule,
    ChansonRoutingModule,
    SharedModule
  ],
  providers: [
    ChansonService
  ]
})
export class ChansonModule { }
