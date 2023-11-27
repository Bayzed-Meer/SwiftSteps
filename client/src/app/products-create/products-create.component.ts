import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css'],
})
export class ProductsCreateComponent {
  productForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.productForm = this.fb.group({
      productName: '',
      shortCode: '',
      category: '',
      price: '',
      description: '',
      imageUrl: '',
      createdDate: '',
      origin: '',
    });
  }

  onSubmit() {
    const formData = this.productForm.value;
    this.productService.createProduct(formData).subscribe({
      next: (response) => {
        console.log('Product created successfully', response);
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Error creating product', error);
      },
    });
  }
}
