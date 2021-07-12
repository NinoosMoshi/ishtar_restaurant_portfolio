import { PurchasesComponent } from './components/purchases/purchases.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'purchases', component: PurchasesComponent},         // http://localhost:4200/purchases
  {path:'order/:id', component: OrderDetailsComponent},     // http://localhost:4200/order/{id}
  {path:'category/:id', component: OrderListComponent},     // http://localhost:4200/category/{id}
  {path:'category', component: OrderListComponent},         // http://localhost:4200/category
  {path:'orders/:key', component: OrderListComponent},      // http://localhost:4200/orders/{key}
  {path:'orders', component: OrderListComponent},           // http://localhost:4200/orders
  {path:'', redirectTo:'/orders',pathMatch:'full'},         // http://localhost:4200
  {path:'**', redirectTo:'/orders',pathMatch:'full'},       // http://localhost:4200/jsdkljkd
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
