import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputersComponent } from './computers.component';

const routes: Routes = [
  {
    path: '',
    component: ComputersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComputersRoutingModule { }
