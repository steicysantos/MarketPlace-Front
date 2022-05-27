import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AddressRegisterComponent } from './address-register/address-register.component';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { LoginOwnerComponent } from './login-owner/login-owner.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    TopBarComponent,
    ProductDetailComponent,
    AddressRegisterComponent,
    ClientRegisterComponent,
    LoginClientComponent,
    LoginOwnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'',component:ProductListComponent},
      {path:'product/:productID',component:ProductDetailComponent},
      {path: 'address-register', component: AddressRegisterComponent},
      {path: 'client-register', component: ClientRegisterComponent},
      {path: 'client/login', component: LoginClientComponent},
      {path: 'owner/login', component: LoginOwnerComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
