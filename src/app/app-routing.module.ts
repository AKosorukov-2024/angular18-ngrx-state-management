import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./superstore/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'cars',
    loadChildren: () => import('./superstore/cars/cars.module').then(m => m.CarsModule)
  },

  {
    path: 'computers',
    loadChildren: () => import('./superstore/computers/computers.module').then(m => m.ComputersModule)
  },
  {
    path: 'cafeteria',
    loadChildren: () => import('./superstore/cafeteria/cafeteria.module').then(m => m.CafeteriaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
