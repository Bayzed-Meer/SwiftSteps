import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EditProductComponent } from './features/edit-product/edit-product.component';
import { HomeComponent } from './layout/home/home.component';
import { MyCartComponent } from './features/my-cart/my-cart.component';
import { ProductsCreateComponent } from './features/products-create/products-create.component';
import { ProductsComponent } from './features/products/products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/create', component: ProductsCreateComponent },
  { path: 'myCart', component: MyCartComponent },
  { path: 'edit-product/:productId', component: EditProductComponent },
];
