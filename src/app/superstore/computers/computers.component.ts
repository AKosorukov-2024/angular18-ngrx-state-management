import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationStateInterface } from '../../stateTypes/application-state.interface';
import { ProductBase } from '../productBase/productBase';
import { ProductsService } from '../../services/products.service'


@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css', '../style/common.css']
})
export class ComputersComponent extends ProductBase implements AfterViewInit {

  constructor(public store: Store<ApplicationStateInterface>,
    productsService: ProductsService) {
    super(store, productsService);
  }

  ngAfterViewInit() {
    this.getProducts();
    this.cleanUpTextArea();
  }
  public async getProducts(): Promise<void>  {
    const result: boolean = await this.checkConnection();
    if (!result) {
      return;
    }
    this.dataSourceChange = true;
    this.httpGetProductList('comptab', 2);
  }
}
