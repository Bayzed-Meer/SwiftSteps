import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatHint, MatError, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-products-create',
    templateUrl: './products-create.component.html',
    styleUrls: ['./products-create.component.css'],
    standalone: true,
    imports: [
        MatCard,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatHint,
        NgIf,
        MatError,
        MatSelect,
        MatOption,
        MatButton,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatIcon,
    ],
})
export class ProductsCreateComponent {
  productForm: FormGroup = new FormGroup({});
  maxDate: any;
  selectedFile: File | null = null;

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
      description: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(250),
          Validators.required,
        ],
      ],
      quantity: ['', Validators.required],
      image: [''],
      createdDate: ['', [Validators.required]],
      origin: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
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
