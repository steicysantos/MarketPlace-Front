import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { ActivatedRoute } from '@angular/router';
import {Product} from '../products'
import axios from 'axios';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  titlePage="Product Detail"
  product : Product | undefined
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productID'));
    
    var config = {
      method: 'get',
      url: 'http://localhost:5062/product/getAll',
      headers: { }
    };

    var instance = this;
    axios(config)
    .then(function (response:any) {
      var products = response.data as Array<Product>;
      instance.product = products.find(p => p.id === productIdFromRoute)
    })
    .catch(function (error:any) {
      console.log(error);
    });

    //this.product = products.find(product => product.id === porductIdFromroute);
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
    var config = {
      method: 'post',
      url: 'http://localhost:5062/purchase/make',
      headers: {
        Authorization:'Bearer '+ localStorage.getItem("authToken"),
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Compra realizada");
      })
      .catch(function (error) {
        
        console.log(error);
      });

  }

}