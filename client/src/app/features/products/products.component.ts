import { Component } from '@angular/core';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Product, ProductService } from '../services/product.service';
import { NgIf, DatePipe } from '@angular/common';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
    standalone: true,
    imports: [
        NgIf,
        MatProgressBar,
        MatButton,
        RouterLink,
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatIcon,
        MatFabButton,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        MatPaginator,
        DatePipe,
    ],
})
export class ProductsComponent {
  isLoading = true;
  displayedColumns: string[] = [
    'number',
    'productName',
    'shortCode',
    'category',
    'price',
    'origin',
    'quantity',
    'createdDate',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>();

  constructor(private productService: ProductService, private router: Router) {}

  currentPage: number = 1;
  pageSize: number = 10;
  totalProduct: number = 0;

  sortBy: string = 'price';
  isAscending: boolean = true;

  sortTable(column: string) {
    if (this.sortBy === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortBy = column;
      this.isAscending = true;
    }

    this.refreshTable(this.currentPage);
  }

  ngOnInit() {
    this.refreshTable(this.currentPage);
  }

  refreshTable(page: number) {
    this.productService
      .getProductsPerPage(page, this.pageSize, this.sortBy, this.isAscending)
      .subscribe({
        next: (products) => {
          products.forEach(
            (product, index) =>
              (product.number = (page - 1) * this.pageSize + index + 1)
          );

          this.dataSource.data = products;
          this.currentPage = page;

          setTimeout(() => {
            this.isLoading = false;
          });
        },
        error: (error) => {
          console.error('Error fetching products', error);
          this.isLoading = false;
        },
      });

    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.totalProduct = data.length;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.refreshTable(event.pageIndex + 1);
  }

  editProduct(product: Product) {
    this.router.navigate(['/edit-product', product._id]);
  }

  deleteProduct(product: Product) {
    const idToDelete = product._id;

    this.productService.deleteProduct(idToDelete).subscribe({
      next: () => {
        console.log('Product deleted successfully:', product);
        const index = this.dataSource.data.findIndex(
          (p) => p._id === idToDelete
        );

        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
          this.refreshTable(this.currentPage);
        }
      },
      error: (error) => {
        console.error('Error deleting product', error);
      },
    });
  }
}
