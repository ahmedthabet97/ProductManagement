import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' }, // Redirect to products list
    { path: 'products', component: ProductsListComponent },
    { path: 'create', component: CreateProductComponent },
    { path: 'edit/:id', component: EditProductComponent },
    { path: '**', redirectTo: '/products' },

];

