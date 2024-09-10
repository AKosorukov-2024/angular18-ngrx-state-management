import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationStateInterface } from '../../stateTypes/application-state.interface';
import { ProductBase } from '../productBase/productBase';
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css', '../style/common.css']
})
export class CarsComponent extends ProductBase implements AfterViewInit {

  constructor(public store: Store<ApplicationStateInterface>,
    productsService: ProductsService) {
    super(store, productsService);
  }

  ngAfterViewInit() {
    this.getProducts();
    this.cleanUpTextArea();
  }
  public async getProducts(): Promise<void> {
    const result: boolean = await this.checkConnection();
    if (!result) {
      return;
    }
    this.dataSourceChange = true;
    this.httpGetProductList('cartab', 3);
  }
}
