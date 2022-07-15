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
import { LoginComponent } from './login/login.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { RegisterStoreComponent } from './register-store/register-store.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductRegisterComponent } from './product-register/product-register.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';
import { SalesComponent } from './sales/sales.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    TopBarComponent,
    ProductDetailComponent,
    AddressRegisterComponent,
    ClientRegisterComponent,
    LoginComponent,
    WishlistComponent,
    RegisterStoreComponent,
    ProfileComponent,
    ProductRegisterComponent,
    PurchasesComponent,
    PurchaseDetailsComponent,
    SalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'',component:ProductListComponent},
      {path:'product/:productID',component:ProductDetailComponent},
      {path: 'address-register', component: AddressRegisterComponent},
      {path: 'client-register', component: ClientRegisterComponent},
      {path: 'login', component: LoginComponent},
      {path: 'wishlist', component: WishlistComponent},
      {path: 'register/store', component: RegisterStoreComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'register/product', component: ProductRegisterComponent},
      {path: 'client/purchases', component: PurchasesComponent},
      {path: 'purchasedetail', component: PurchaseDetailsComponent},
      {path: 'owner/sales', component: SalesComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
