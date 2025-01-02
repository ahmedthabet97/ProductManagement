import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { createOrUpdateProducts } from '../models/createOrUpdateProducts';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class ProductService {

  private apiUrl = 'http://localhost:5296/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product: createOrUpdateProducts): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
