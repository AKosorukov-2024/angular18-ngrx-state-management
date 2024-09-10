import { Observable } from 'rxjs';
import { ProductInterface } from '../types/product.interface';
import { Store } from '@ngrx/store';
import { ApplicationStateInterface } from '../../stateTypes/application-state.interface';
import { ProductsService } from '../../services/products.service';
import {
  productsSelector,
  errorSelector,
  isLoadingSelector,
} from '../../store/selectors';
import * as ProductsActions from '../../store/actions';

export class ProductBase {
  public ptable: HTMLElement | null | undefined;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string | null>;
  public products$: Observable<ProductInterface[]>;
  public baseUrl = 'https://localhost:7009/api/Products';
  public dataSource = '';
  private tabs: string[] = ['ptab', 'comptab', 'cartab', 'cafetab'];
  protected dataSourceChange = false;
  protected dataSourceSQL = 'DataSource: SQL Server Database';
  protected dataSourceClientState = 'DataSource: Application State';

  constructor(protected storeBase: Store<ApplicationStateInterface>,
    protected productsService: ProductsService) {
    this.isLoading$ = this.storeBase.select(isLoadingSelector);
    this.error$ = this.storeBase.select(errorSelector);
    this.products$ = this.storeBase.select(productsSelector);
  }

  protected fillState(products: ProductInterface[]): void {
    const data = [...products];
    this.storeBase.dispatch(
      ProductsActions.loadProductsSuccess({ products: data }));
    this.displayProductList(products);
  }

  protected clearState(): void {
    this.storeBase.dispatch(
      ProductsActions.clearState()
    );
    this.cleanUpProductList();
  }

  protected displayProductList(products: ProductInterface[]) {

    if (!this.ptable) {
      return;
    }

    if (!products || products.length == 0) {
      return;
    }
    
    this.cleanUpProductList();

    const dataSourceLabel = document.getElementById('dataSource') as HTMLDivElement;
    dataSourceLabel.textContent = this.dataSource;
    const tbl = document.createElement('table');
    tbl.setAttribute('id', 'listTable');

    const tblBody = document.createElement('tbody');
    // creates a table header
    let row = document.createElement('tr');
    let cell = document.createElement('th');
    let cellText = document.createTextNode('Product Id');
    cell.appendChild(cellText);
    row.appendChild(cell);
    cell = document.createElement('th');
    cellText = document.createTextNode('Name');
    cell.appendChild(cellText);
    row.appendChild(cell);
    cell = document.createElement('th');
    cellText = document.createTextNode('Price');
    cell.appendChild(cellText);
    row.appendChild(cell);
    cell = document.createElement('th');
    cellText = document.createTextNode('Type id');
    cell.appendChild(cellText);
    row.appendChild(cell);
    tblBody.appendChild(row);

    for (const product of products) {
      // creating all cells
      // creates a table row

      row = document.createElement('tr');

      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      cell = document.createElement('td');
      cellText = document.createTextNode(`${product.id}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
      cell = document.createElement('td');
      cellText = document.createTextNode(`${product.name}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
      cell = document.createElement('td');
      cellText = document.createTextNode(`${product.price}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
      cell = document.createElement('td');
      cellText = document.createTextNode(`${product.typeId}`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      // add the row to the end of the table body
      tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    this.ptable.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute('border', '2');
  }

  protected cleanUpProductList() {
    const dataSourceLabel = document.getElementById('dataSource') as HTMLDivElement
    dataSourceLabel.textContent = '';

    if (!this.ptable) {
      return;
    }
    this.ptable.replaceChildren();
  }

  protected async checkConnection(): Promise<boolean> {
    let result = false;
    await fetch(this.baseUrl, { method: 'GET' })
      .then(response => response)
      .then(() => {
        result = true;
      })
      .catch((error) => {
        console.log(error.message);
        const dataSourceLabel = document.getElementById('dataSource') as HTMLDivElement;
        dataSourceLabel.textContent = '';
        this.tabs.forEach((tab) => {
          const ptab = document.getElementById(tab);
          if (ptab) {
            ptab.replaceChildren();
          }
        });
        result = false;
        const elem = document.getElementById("txtArea") as HTMLTextAreaElement;
        if (elem) {
          elem.innerText = "";
        }
      });

    if (!result) {
      this.showStatus("Server is down!");
    }
    return result;
  }

  protected showStatus(text: string): void {
    const elem = document.getElementById("txtArea") as HTMLTextAreaElement;
    elem.innerText = text;
  }

  protected httpGetProductList(tab: string, typeId: number): void {
    let products: ProductInterface[] = [];
    const subscription1 = this.products$.subscribe((data) => {
      products = data;
      if (products.length > 0 && this.dataSourceChange) {
        this.dataSource = this.dataSourceClientState;
      }
      if (typeId > 0) {
        products = products.filter(el => el.typeId == typeId);
      }
    });

    const subscription2 = this.error$.subscribe((data) => {
      if (data) {
        const elem = document.getElementById("txtArea") as HTMLTextAreaElement;
        elem.innerText = data;  
      }
    });


    this.ptable = document.getElementById(tab);
    subscription1.unsubscribe();
    subscription2.unsubscribe();
    if (products.length == 0) {
      this.dataSource = this.dataSourceSQL;
      this.getList()
        .then((productList) => {
          products = JSON.parse(productList);
          if (typeId > 0) {
            products = products.filter(el => el.typeId == typeId);
          }
          this.fillState(products);
          this.displayProductList(products);
        });
    } else {
      this.displayProductList(products);
    }
    this.dataSourceChange = true;
  }

  protected cleanUpTextArea() {
    this.storeBase.dispatch(
      ProductsActions.clearStateError()
    );
    const elem = document.getElementById("txtArea") as HTMLTextAreaElement;
    if (elem) {
      elem.innerText = "";
    }
  }

  private async getList(): Promise<string> {
      return this.productsService.getProductList(this.baseUrl + '/ProductList');
  };
}
