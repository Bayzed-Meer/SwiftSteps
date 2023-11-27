import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
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

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.dataSource.data = products;
    });
  }

  editProduct(product: Product) {
    console.log('Edit product:', product);
  }

  deleteProduct(product: Product) {
    console.log('Delete product:', product);
  }
}
