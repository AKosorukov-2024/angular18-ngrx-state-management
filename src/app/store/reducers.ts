import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductInterface } from '../superstore/types/product.interface';
import { ProductStateInterface } from '../superstore/types/productState.interface';
import * as ProductActions from './actions';

export function selectProductId(el: ProductInterface): number {
  //In this case this would be optional since primary key is id
  return el.id;
}

export function sortByProductType(a: ProductInterface, b: ProductInterface): number {
  return (a.typeId - b.typeId);
}

export const adapter: EntityAdapter<ProductInterface> = createEntityAdapter<ProductInterface>(
  {
    selectId: (el: ProductInterface) => el.id
  });

export const initialState: ProductStateInterface = adapter.getInitialState({
  isLoading: false,
  error: null
});

export const reducers = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, payload) => {
    return adapter.addMany(payload.products, { ...state, isLoading: false });
  }),
  on(ProductActions.loadProductsFailure, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  })),
  on(ProductActions.getProductSuccess, (state, payload) => {
    if (payload.product.name == 'Error') {
      return state;
    }
      return adapter.addOne(payload.product, { ...state, isLoading: false });
  }),
  on(ProductActions.getProductFailure, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  })),

  on(ProductActions.addProduct, (state) => ({ ...state, isLoading: true })),
  on(ProductActions.addProductSuccess, (state, payload) => {
    if (payload.product.name.startsWith('Error')) {
      state = { ...state, isLoading: false, error: payload.product.name };
      return state;
    }
    return adapter.addOne(payload.product, { ...state, isLoading: false });
  }),
  on(ProductActions.addProductFailure, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  })),

  on(ProductActions.deleteProduct, (state) => ({ ...state, isLoading: true })),
  on(ProductActions.deleteProductSuccess, (state, payload) => {
    return adapter.removeOne(payload.productId, { ...state, isLoading: false });
  }),
  on(ProductActions.deleteProductFailure, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  })),
  on(ProductActions.clearState, (state) => {
    return adapter.removeAll({ ...state, selectId: null });
  }),

  on(ProductActions.clearStateError, (state) => {
    state = { ...state, isLoading: false, error: '' };
      return state;
    })
);
