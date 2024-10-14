import { createAction, props } from '@ngrx/store';
import { ProductInterface } from '../superstore/types/product.interface';
import { Product } from '../superstore/types/product';

export const loadProductsSuccess = createAction(
  '[Products] Load Products success',
  props<{ products: ProductInterface[]}>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products failure',
  props<{ error: string }>()
);

export const getProductSuccess = createAction(
  '[Product] Get Product success',
  props<{ product: ProductInterface }>()
);
export const getProductFailure = createAction(
  '[Product] Get Product failure',
  props<{ error: string }>()
);

export const addProduct = createAction(
  '[Product] Add Product',
  props < { url: string,  product: Product }>()
);
export const addProductSuccess = createAction(
  '[Product] Add Product success',
  props<{ product: ProductInterface }>()
);
export const addProductFailure = createAction(
  '[Product] Add Product failure',
  props<{ error: string }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ url: string, productId: number }>()
);
export const deleteProductSuccess = createAction(
  '[Products] Delete Product success',
  props<{ productId: number }>()
);
export const deleteProductFailure = createAction(
  '[Products] Delete Product failure',
  props<{ error: string }>()
);
export const clearState = createAction(
  '[Products] Clear state'
);

export const clearStateError = createAction(
  '[Products] Clear error'
);

