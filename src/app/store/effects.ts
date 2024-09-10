import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as ProductActions from './actions';
import { ProductInterface } from '../superstore/types/product.interface';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductsEffects {

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap(({ url, product }) => {
        return this.productsService.addProduct(url, product)
          .pipe(
            map((product: ProductInterface) =>
              ProductActions.addProductSuccess({ product })),
            catchError((error) =>
              of(ProductActions.addProductFailure({ error: error.message }))
            )
          );
      })
    )
  );


  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({ url, productId }) => {
        this.productsService.deleteProduct(url, productId.toString());
        return of(productId)
          .pipe(
            map((productId: number) =>
              ProductActions.deleteProductSuccess({ productId })),
            catchError((error) =>
              of(ProductActions.deleteProductFailure({ error: error.message }))
            )
          );
      })
    )
  );
  constructor(private actions$: Actions, private productsService: ProductsService) {
  }
}
