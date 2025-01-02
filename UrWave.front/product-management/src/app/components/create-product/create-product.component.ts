import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { createOrUpdateProducts } from '../../models/createOrUpdateProducts';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  providers: [ProductService]
})
export class CreateProductComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(1)]]
    });
  }
  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: createOrUpdateProducts = this.productForm.value;
      this.productService.createProduct(newProduct).subscribe({
        next: (product) => {
          alert('Product created successfully!');
          this.productForm.reset();
        },
        error: (err) => {
          console.error('Error creating product', err);
          alert('Failed to create product');
        }
      });
    }
  }
}
