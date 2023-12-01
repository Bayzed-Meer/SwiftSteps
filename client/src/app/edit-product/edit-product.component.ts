import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  maxDate: any;
  isLoading = true;
  productForm: FormGroup = this.fb.group({
    _id: [''],
    productName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    shortCode: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    category: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', [Validators.minLength(3), Validators.maxLength(250)]],
    quantity: ['', Validators.required],
    imageUrl: [''],
    createdDate: ['', [Validators.required]],
    origin: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.maxDate = new Date();
    this.route.params.subscribe({
      next: (params) => {
        const productId = params['productId'];
        if (!productId) {
          console.error('Product ID is undefined');
          this.isLoading = false;
          return;
        }

        this.productService.getProductById(productId).subscribe({
          next: (product) => {
            if (!product) {
              console.error('Product not found');
              this.isLoading = false;
              return;
            }

            this.productForm.patchValue(product);
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error fetching product:', error);
            this.isLoading = false;
          },
        });
      },
      error: (error) => {
        console.error('Error subscribing to route params:', error);
        this.isLoading = false;
      },
    });
  }

  onSubmit() {
    const productId = this.productForm!.get('_id')!.value;
    const formData = this.productForm.value;
    formData.id = productId;
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
