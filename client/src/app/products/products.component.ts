import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  isLoading = true;
  displayedColumns: string[] = [
    'productName',
    'shortCode',
    'category',
    'price',
    'origin',
    'quantity',
    'imageUrl',
    'createdDate',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>();

  constructor(private productService: ProductService, private router: Router) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // Uncomment the line below if you still need to set the paginator here
    // this.dataSource.paginator = this.paginator;
  }

  currentPage: number = 1;

  ngOnInit() {
    this.refreshTable(this.currentPage);
  }

  refreshTable(page: number) {
    const pageSize = 10;

    setTimeout(() => {
      this.isLoading = false;
    }, 800);

    this.productService.getProducts(page, pageSize).subscribe({
      next: (products) => {
        this.dataSource.data = products;
        this.currentPage = page;

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      },
      error: (error) => {
        console.error('Error fetching products', error);
      },
    });
  }

  onPageChange(event: any) {
    this.refreshTable(event.pageIndex + 1);
  }

  editProduct(product: Product) {
    this.router.navigate(['/edit-product', product.shortCode]);
  }

  deleteProduct(product: Product) {
    const shortCodeToDelete = product.shortCode;

    this.productService.deleteProduct(shortCodeToDelete).subscribe({
      next: () => {
        console.log('Product deleted successfully:', product);
        const index = this.dataSource.data.findIndex(
          (p) => p.shortCode === shortCodeToDelete
        );

        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
      },
      error: (error) => {
        console.error('Error deleting product', error);
      },
    });
  }
}
