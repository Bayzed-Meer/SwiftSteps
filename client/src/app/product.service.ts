import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, productData);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getAllProducts`);
  }

  deleteProduct(shortCode: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/product/${shortCode}`);
  }
}

export interface Product {
  productName: string;
  shortCode: string;
  category: string;
  price: number;
  origin: string;
  imageUrl: string;
  description: string;
  createdDate: Date;
}
