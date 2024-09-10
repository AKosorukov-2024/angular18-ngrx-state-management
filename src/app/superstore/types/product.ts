import { ProductInterface } from './product.interface';
export class Product implements ProductInterface {
  public id = 0;
  public name = "";
  public price = 0;
  public typeId = 0;
  public typeName = "";
}
