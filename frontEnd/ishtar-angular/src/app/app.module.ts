import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderListComponent } from './components/order-list/order-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { SearchOrderComponent } from './components/search-order/search-order.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    CategoryListComponent,
    DropdownMenuComponent,
    SearchOrderComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
