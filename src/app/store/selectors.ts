import { createSelector } from '@ngrx/store';
import { ApplicationStateInterface } from '../stateTypes/application-state.interface';
import { adapter } from './reducers';

export const selectFeature = (state: ApplicationStateInterface) => state.products;

export const productsSelector = createSelector(
  selectFeature,
  adapter.getSelectors().selectAll
);

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

