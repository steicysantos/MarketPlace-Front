import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
import axios from 'axios';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: [Product] | undefined;
titlePage = "Produtos";
  constructor() { }

  ngOnInit(): void {
    this.procurar();
  }
 procurar(){
    var config = {
      method: 'get',
      url: 'http://localhost:5062/product/getAll',
      headers: { }
    };
    var instance  = this;
    axios(config).then(function (response:any ) {
      instance.products = response.data;
    })
    .catch(function (error: any) {
      console.log(error);
    });
  
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
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}