import { HttpClient, HttpParams } from '@angular/common/http';
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

  getProducts(page: number, pageSize: number): Observable<Product[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Product[]>(`${this.baseUrl}/getAllProducts`, {
      params,
    });
  }

  deleteProduct(shortCode: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteProduct/${shortCode}`);
  }

  getProductByShortCode(shortCode: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/getProduct/${shortCode}`);
  }

  updateProduct(productData: any): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/updateProduct/${productData.shortCode}`,
      productData
    );
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
