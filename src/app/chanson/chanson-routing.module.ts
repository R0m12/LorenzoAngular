import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChansonListComponent } from './pages/chanson-list/chanson-list.component';

const routes: Routes = [  
  {
    path: '',
    component: ChansonListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChansonRoutingModule { }
