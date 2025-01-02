import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { ProductService } from './services/product.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ProductService]
})
export class AppComponent {
  title = 'product-management';
}
