import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsService } from '../../services/products.service';
import { ProductsEffects } from '../../store/effects';
import { reducers } from '../../store/reducers';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature([ProductsEffects])
  ],
  providers: [ProductsService],
  declarations: [],
  exports: []

})
export class ProductsModule { }
