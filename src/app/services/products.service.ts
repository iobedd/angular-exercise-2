import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private apiUrl = 'https://localhost:44313/api/Products'

  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.apiUrl, product);
  }

  deleteProduct(id?: string): Observable<any> {
    return this.http.delete(this.apiUrl + "/" + id);
  }

  updateProduct(product: Product): Observable<Product>
  {
    return this.http.put<Product>(this.apiUrl + "/update", product);
  }

  getProductsKeywords(keyword?: string): Observable<Product[]>
  {
    return this.http.get<Product[]>(this.apiUrl + "/get-products-keywords/" + keyword);
  }

  getOrderDes():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl+"/order-des-createdOn");
  }

  getOrderAsc():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl+"/order-asc-createdOn");
  }
}
