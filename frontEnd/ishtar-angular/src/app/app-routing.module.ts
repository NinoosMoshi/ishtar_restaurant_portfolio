import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteActiveService } from './services/security/canActive/route-active.service';
import { LoginLogoutActiveService } from './services/security/canActive/login-logout-active.service';

const routes: Routes = [
  {path:'login', component: LoginComponent, canActivate:[LoginLogoutActiveService]},                // http://localhost:4200/login
  {path:'signup', component: SignupComponent, canActivate:[LoginLogoutActiveService]},              // http://localhost:4200/signup
  {path:'check-out', component: CheckOutComponent, canActivate:[RouteActiveService]},         // http://localhost:4200/check-out
  {path:'purchases', component: PurchasesComponent, canActivate:[RouteActiveService]},        // http://localhost:4200/purchases
  {path:'order/:id', component: OrderDetailsComponent, canActivate:[RouteActiveService]},     // http://localhost:4200/order/{id}
  {path:'category/:id', component: OrderListComponent, canActivate:[RouteActiveService]},     // http://localhost:4200/category/{id}
  {path:'category', component: OrderListComponent, canActivate:[RouteActiveService]},         // http://localhost:4200/category
  {path:'orders/:key', component: OrderListComponent, canActivate:[RouteActiveService]},      // http://localhost:4200/orders/{key}
  {path:'orders', component: OrderListComponent, canActivate:[RouteActiveService]},           // http://localhost:4200/orders
  {path:'', redirectTo:'/orders',pathMatch:'full'},         // http://localhost:4200
  {path:'**', redirectTo:'/orders',pathMatch:'full'},       // http://localhost:4200/jsdkljkd
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
