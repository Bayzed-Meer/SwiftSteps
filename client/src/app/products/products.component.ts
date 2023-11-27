import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  displayedColumns: string[] = [
    'productName',
    'shortCode',
    'category',
    'price',
    'origin',
    'imageUrl',
    'createdDate',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>();
  products: Product[] = [
    {
      productName: 'Running Shoes',
      shortCode: 'RS001',
      category: 'Footwear',
      price: 49.99,
      origin: 'USA',
      imageUrl: 'https://example.com/shoes.jpg',
      createdDate: new Date('2023-01-01'),
    },
  ];

  ngOnInit() {
    this.dataSource.data = this.products;
  }

  editProduct(product: Product) {
    console.log('Edit product:', product);
  }

  deleteProduct(product: Product) {
    console.log('Delete product:', product);
  }
}
interface Product {
  productName: string;
  shortCode: string;
  category: string;
  price: number;
  origin: string;
  imageUrl: string;
  createdDate: Date;
}
