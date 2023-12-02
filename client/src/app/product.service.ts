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
    return this.http.post(`${this.baseUrl}/createProduct`, productData);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getAllProducts`);
  }

  getProductsPerPage(page: number, pageSize: number): Observable<Product[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Product[]>(`${this.baseUrl}/getProductsPerPage`, {
      params,
    });
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteProduct/${productId}`);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/getProduct/${productId}`);
  }

  updateProduct(productData: any): Observable<void> {
    const productId = productData._id;
    return this.http.put<void>(
      `${this.baseUrl}/updateProduct/${productId}`,
      productData
    );
  }
}

export interface Product {
  _id: string;
  productName: string;
  shortCode: string;
  category: string;
  price: number;
  origin: string;
  quantity: number;
  imageUrl?: string;
  description?: string;
  createdDate: Date;
  number?: number;
}
