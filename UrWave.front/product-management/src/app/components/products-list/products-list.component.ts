import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';  // Import ToastModule
import { ButtonModule } from 'primeng/button';  // Import ButtonModule
import { MessageService } from 'primeng/api';  // To show success/error notifications
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    RouterModule,
    RouterModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    HttpClientModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  providers: [ProductService, MessageService]
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  productToDelete: any;
  loading: boolean = false;
  error: string | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  constructor(private productService: ProductService,
    private messageService: MessageService, private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getAllProducts()
    this.loadProducts()
  }
  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.snackBar.open(this.error, 'Close', { duration: 2000 });
        console.error(err); // Basic error logging
        this.loading = false;
      }
    });
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }
  onSearch() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) && (!this.minPrice || product.price >= this.minPrice) &&
      (!this.maxPrice || product.price <= this.maxPrice)
    );
  }


  deleteProduct(productId: number) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the product deletion logic here
        this.productService.deleteProduct(productId).subscribe(
          (response) => {
            alert("the product has been successfully deleted")
            this.getAllProducts();  // Reload the products after deletion
          },
          (error) => {
          }
        );
      }
    });
  }

}