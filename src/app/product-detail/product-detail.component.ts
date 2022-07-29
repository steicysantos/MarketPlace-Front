import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { ActivatedRoute } from '@angular/router';
import {Product} from '../products'
import axios from 'axios';
import { Route, Router } from '@angular/router';
import {WishList} from '../wishlist';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  wishlists : [WishList] | undefined;
  arrAdds : Array<Number>;
  titlePage="Product Detail"
  coracao : Boolean | null;
  product : Product | undefined
  idstock!: number;
  constructor(private route: ActivatedRoute,private router: Router) { 
    this.arrAdds = [];
    this.coracao = false;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productID'));
    this.idstock=1;
    var config = {
      method: 'get',
      url: 'http://localhost:5062/product/getAll',
      headers: { }
    };
    var config2 = {
      method: 'get',
      url: 'http://localhost:5062/stock/getStockID/'+productIdFromRoute,
      headers: { }
    };

    var instance = this;
    axios(config)
    .then(function (response:any) {
      var products = response.data as Array<Product>;
      instance.idstock=productIdFromRoute;
      instance.product = products.find(p => p.idStocks === productIdFromRoute)
    })
    .catch(function (error:any) {
      console.log(error);
    });

    //this.product = products.find(product => product.id === porductIdFromroute);

    this.getWishlist()

  }
  async getWishlist(){
    var config = {
      method: 'get',
      url: 'http://localhost:5062/wishlist/getproduct/' ,
      headers: { 
        'Authorization': 'Bearer ' +  localStorage.getItem("authToken")
      }
    };
   var response = await axios(config);
   this.wishlists = response.data;
   if(this.wishlists != undefined){
    for(let wishlist of this.wishlists){
      this.arrAdds.push(wishlist.id);
    }
  }
  if(this.arrAdds.includes(this.idstock)){
    this.coracao=true
    console.log(this.coracao)
  }else{
    this.coracao=false
    console.log(this.coracao)
  }
  }

  show(){
    var divs = document.getElementById('types');
    if(divs!=undefined){
      divs!.style.visibility="block"
    }
    divs!.style.display="block"
  }
  
  finalize(){
    var min = Math.ceil(1000);
    var max = Math.floor(5000);
    let date_purchase = new Date();
    var ele = document.getElementsByTagName('input');
    var typeofpayment;
    var quantidade=this.product?.quantity


    for(var i = 0; i < ele.length; i++) {
                  
      if(ele[i].type="radio") {
        
          if(ele[i].checked){
            typeofpayment=ele[i].value
            break;
          }
          else{
            typeofpayment=1
          }
              
      }
    }
    var data = JSON.stringify({
      date_purchase: date_purchase,
      payment_type: typeofpayment,
      purchase_status: 1,
      purchase_values: this.product?.unit_price,
      number_confirmation: Math.floor(Math.random() * (max - min + 1)) + min,
      number_nf: "1414144",
      idProduct: this.product?.id,
      idStore: this.product?.idStore
    });

    console.log(JSON.stringify(data));
    if(typeof quantidade==='number' && quantidade>0){
      var config = {
        method: 'post',
        url: 'http://localhost:5062/purchase/make',
        headers: {
          Authorization:'Bearer '+ localStorage.getItem("authToken"),
          'Content-Type': 'application/json',
        },
        data: data,
      }
      var config2 = {
        method: 'put',
        url: 'http://localhost:5062/stock/updateQuantity/'+this.idstock,
        headers: {
          Authorization:'Bearer '+ localStorage.getItem("authToken"),
          'Content-Type': 'application/json',
        },
        data: data,
      }
      var self = this;
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          alert("Compra realizada");
          self.router.navigate(['client/purchases'])
        })
        .catch(function (error) {
          
          console.log(error);
        });
        axios(config2)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          self.router.navigate(['client/purchases'])
        })
        .catch(function (error) {
          
          console.log(error);
        });
    }
    else{
      alert("Estoque insuficiente")
    }
  }

  AddProductToWishList(IdStocks: Number) {
    var data = JSON.stringify({
      id: IdStocks,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5062/wishList/register',
      headers: {
        Authorization:'Bearer '+ localStorage.getItem("authToken"),
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  RemoveWishList(WishListId:number){
    var config = {
      method: 'delete',
      url: 'http://localhost:5062/wishlist/deleteStock/' + WishListId,
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem("authToken"),
      }
    };
    let instance = this;
    axios(config)
    .then(function (response: any) {
      window.location.reload();
    })
    .catch(function (error : any) {
      console.log(error);
    });
  }

}