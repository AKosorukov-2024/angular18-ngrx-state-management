import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputersRoutingModule } from './computers-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsService } from '../../services/products.service';
import { ProductsEffects } from '../../store/effects';
import { reducers } from '../../store/reducers';



@NgModule({
  imports: [
    CommonModule,
    ComputersRoutingModule,
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature([ProductsEffects])
  ],
  providers: [ProductsService],
  declarations: [],
  exports: []
})
export class ComputersModule { }
