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
  selectedFile: File | null = null;
  productId: string = '';

  productForm: FormGroup = this.fb.group({
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
    image: [''],
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
        this.productId = params['productId'];
        if (!this.productId) {
          console.error('Product ID is undefined');
          this.isLoading = false;
          return;
        }

        this.productService.getProductById(this.productId).subscribe({
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
    if (this.productForm.valid) {
      const formData = new FormData();

      // Append form fields to FormData
      for (const key in this.productForm.controls) {
        if (this.productForm.controls.hasOwnProperty(key)) {
          const value = this.productForm.get(key)?.value;
          formData.append(key, value);
        }
      }

      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.productService.updateProduct(formData, this.productId).subscribe({
        next: () => {
          console.log('Product updated successfully');
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error updating product:', error);
        },
      });
    } else {
      console.error('Form validation failed. Please check the entered data.');
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
