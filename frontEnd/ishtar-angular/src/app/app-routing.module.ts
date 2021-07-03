import { OrderListComponent } from './components/order-list/order-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'category/:id', component: OrderListComponent},     // http://localhost:4200/category/{id}
  {path:'category', component: OrderListComponent},         // http://localhost:4200/category
  {path:'orders', component: OrderListComponent},           // http://localhost:4200/orders
  {path:'', redirectTo:'/orders',pathMatch:'full'},         // http://localhost:4200
  {path:'**', redirectTo:'/orders',pathMatch:'full'},       // http://localhost:4200/jsdkljkd
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
