import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://profilexpert.onrender.com/';

  constructor(private http: HttpClient) {}

  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/product/createProduct`, productData);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/product/getAllProducts`);
  }

  getProductsPerPage(
    page: number,
    pageSize: number,
    sortBy: string,
    isAscending: boolean
  ): Observable<Product[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('isAscending', isAscending.toString());

    return this.http.get<Product[]>(
      `${this.baseUrl}/product/getProductsPerPage`,
      {
        params,
      }
    );
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/product/deleteProduct/${productId}`
    );
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(
      `${this.baseUrl}/product/getProduct/${productId}`
    );
  }

  updateProduct(productData: any, id: string): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/product/updateProduct/${id}`,
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
