import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationStateInterface } from '../../stateTypes/application-state.interface';
import { ProductBase } from '../productBase/productBase';
import { Product } from '../types/product';
import { ProductInterface } from '../types/product.interface';
import { ProductsService } from '../../services/products.service';
import * as ProductsActions from '../../store/actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../style/common.css']
})
export class ProductsComponent extends ProductBase implements AfterViewInit {


  public product: Product = new Product();
  public productTypes: string[] = ['Cafeteria', 'Computers', 'Cars'];
  private ProductTypeIds: number[] = [1, 2, 3];
  public productDataSourse = '';
  constructor(public store: Store<ApplicationStateInterface>,
    productsService: ProductsService
  ) {
    super(store,
      productsService) 
  }

  ngAfterViewInit() {
    this.getTotalProductList();
    this.dataSourceChange = true;
    this.cleanUpTextArea();
  }

  public getProducts() {
    this.cleanUpTextArea();
    this.dataSourceChange = true;
    this.getTotalProductList();
  }

  public async getTotalProductList(): Promise<void> {

    const result: boolean = await this.checkConnection();
    if (!result) {
      return;
    }
    setTimeout(() => { this.httpGetProductList('ptab', 0) }, 500);
  }

  public onProductTypeSelected(productName: string): void {
    const index: number = this.productTypes.indexOf(productName);
    this.product.typeId = index < 0 ? 0 : this.ProductTypeIds[index];
  }

  public getProduct(): void {
    this.cleanUpTextArea(); 
    if (this.product.id == 0) {
      this.showStatus("The field 'Product Id' cannot be empty!");
      return;
    }

    this.httpGetProduct();
  }

  public async addProduct(): Promise<void> {
    this.cleanUpTextArea(); 
    const result: boolean = await this.checkConnection();
    if (!result) {
      return;
    }
    
    if (this.product.id == 0
      || this.product.name.trim().length == 0
      || this.product.price == 0
      || this.product.typeId == 0) {
      this.showStatus("Please fill in all fields!");
      return;
    }
    this.dataSourceChange = false;
    const productData = new Product();

    productData.id = this.product.id;
    productData.name = this.product.name;
    productData.price = this.product.price;
    productData.typeId = this.product.typeId;
    productData.typeName = this.product.typeName;

    this.storeBase.dispatch(
      ProductsActions.addProduct({ url: this.baseUrl, product: productData }));
    this.getTotalProductList();
  }

  public async deleteProduct(): Promise<void> {
    this.cleanUpTextArea(); 
    const result: boolean = await this.checkConnection();
    if (!result) {
      return;
    }

    if (this.product.id == 0) {
      this.showStatus("The field 'Product Id' cannot be zero!");
      return;
    }
    this.dataSourceChange = false;


    this.storeBase.dispatch(
      ProductsActions.deleteProduct({ url: this.baseUrl, productId: this.product.id }));
    this.getTotalProductList();
  }

  public cleanup(): void {
    this.product = new Product();

    const elem = document.getElementById("txtArea") as HTMLTextAreaElement;
    elem.innerText = "";
    const ptab = document.getElementById('ptab');
    if (ptab) {
      ptab.replaceChildren();
    }
  }

  private async httpGetProduct(): Promise<void> {

    const result: boolean = await this.checkConnection();
    if (!result) {
      return;
    }
    this.dataSource = this.dataSourceClientState;
    this.dataSourceChange = false;

    if (this.getProductFromState() != undefined) {
      this.ShowProduct();
      return;
    }

    this.dataSource = this.dataSourceSQL;
    this.productsService.getProduct(this.baseUrl, this.product.id)
      .then((data) => {
        const response = JSON.parse(data);
        if (Object.hasOwn(response, "ErrorMessage")) {
          this.showStatus(response.ErrorMessage);
          return;
        }
        const productData = response;
        this.storeBase.dispatch(
          ProductsActions.getProductSuccess({ product: productData }));
        this.ShowProduct();
      })
      .catch(error => {
        this.storeBase.dispatch(
          ProductsActions.getProductFailure({ error: error.message }));
        this.ShowProduct();
        console.log(error);
      });
  }

  private ShowProduct() {
    let stateData: ProductInterface[] = [];
    const subscription = this.products$.subscribe((data) => {
      stateData = data;
      const p = stateData.find(el => el.id == this.product.id);
      if (p) {
        this.product.id = p.id;
        this.product.name = p.name;
        this.product.price = p.price;
        this.product.typeId = p.typeId;

        const productTypeSelect = document.getElementById('Type') as HTMLSelectElement;
        productTypeSelect.selectedIndex = this.ProductTypeIds.indexOf(p.typeId) + 1;
      }
      this.getTotalProductList();
    });

    subscription.unsubscribe();
  }

  private getProductFromState(): Product | undefined {
    let p: Product | undefined;
    let stateData: ProductInterface[] = [];
    const subscription = this.products$.subscribe((data) => {
      stateData = data;
      p = stateData.find(el => el.id == this.product.id);
    });
    subscription.unsubscribe();
    return p;
  }
}
