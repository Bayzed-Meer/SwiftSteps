import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css'],
})
export class ProductsCreateComponent {
  productForm: FormGroup = new FormGroup({});
  maxDate: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.maxDate = new Date();
    this.productForm = this.fb.group({
      productName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      shortCode: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', [Validators.minLength(3), Validators.maxLength(250)]],
      quantity: ['', Validators.required],
      imageUrl: [''],
      createdDate: ['', [Validators.required]],
      origin: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.productForm.value;

    if (this.productForm.valid) {
      this.productService.createProduct(formData).subscribe({
        next: (response) => {
          console.log('Product created successfully', response);
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error creating product', error);
        },
      });
    } else {
      console.error('Form validation failed. Please check the entered data.');
    }
  }
}
