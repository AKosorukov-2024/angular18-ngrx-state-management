import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../superstore/types/product';

@Injectable()
export class ProductsService {
    constructor(private http: HttpClient = inject(HttpClient)) {
      }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getProductList(Url: string): Promise<any> {

    const headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')

    const params = new HttpParams();
    const response = this.http.get(Url, { headers: headers, params: params }).toPromise();
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getProduct(Url: string, id: number): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')

    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('productId', id);
    const response = await this.http.get(Url, { headers: headers, params: params }).toPromise();
    return response;
  }

  public addProduct(Url: string, product: Product): Observable<Product> {
    const newProduct = JSON.stringify(product);

    const headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('product', newProduct)

    const response = this.http.post<Product>(Url, '', {
      headers: headers
    });
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async deleteProduct(Url: string, productId: string): Promise<any> {
    let params = new HttpParams();
    // Begin assigning parameters
    params = params.append('productId', productId);

    const response = this.http.delete(Url, { params: params }).toPromise();
    return response;
  }
}

