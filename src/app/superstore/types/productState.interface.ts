import { EntityState } from '@ngrx/entity';
import { ProductInterface } from './product.interface';
export interface ProductStateInterface extends EntityState<ProductInterface> {
  isLoading: boolean;
  error: string | null;
}
