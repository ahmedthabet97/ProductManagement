import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
  providers: [ProductService]
})
export class EditProductComponent {
  productForm: FormGroup;
  productId: number | undefined;
  product: Product | undefined;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')); // Retrieve product ID from route params
    this.loadProductData();
  }

  loadProductData(): void {
    this.productService.getProductById(this.productId || 0).subscribe(
      (data: Product) => {
        this.product = data;
        this.productForm.patchValue({
          name: this.product.name,
          description: this.product.description,
          price: this.product.price
        });

      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct: Product = { ...this.productForm.value, id: this.productId };

      this.productService.updateProduct(updatedProduct).subscribe(
        (response) => {
          alert("the product has been updated successfully")

          this.router.navigate(['/products']); // Navigate to products list after successful update
        },
        (error) => {
          alert("can not update product!")

          console.error(error);
        }
      );
    }
  }
}
