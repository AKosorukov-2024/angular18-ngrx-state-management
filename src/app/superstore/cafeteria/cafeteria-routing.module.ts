import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CafeteriaComponent } from './cafeteria.component';

const routes: Routes = [
  {
    path: '',
    component: CafeteriaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CafeteriaRoutingModule { }
