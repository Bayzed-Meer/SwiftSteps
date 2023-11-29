import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup = this.fb.group({
    productName: '',
    shortCode: '',
    category: '',
    price: '',
    description: '',
    imageUrl: '',
    createdDate: '',
    origin: '',
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        const shortCode = params['shortCode'];

        if (!shortCode) {
          console.error('Short code is undefined');
          // Handle the error or navigate to an error page
          return;
        }

        this.productService.getProductByShortCode(shortCode).subscribe({
          next: (product) => {
            if (!product) {
              console.error('Product not found');
              // Handle the error or navigate to an error page
              return;
            }

            this.productForm.patchValue(product);
          },
          error: (error) => {
            console.error('Error fetching product:', error);
          },
        });
      },
      error: (error) => {
        console.error('Error subscribing to route params:', error);
      },
    });
  }

  onSubmit() {
    const formData = this.productForm.value;
    this.productService.updateProduct(formData).subscribe({
      next: () => {
        console.log('Product updated successfully');
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Error updating product:', error);
      },
    });
  }
}
