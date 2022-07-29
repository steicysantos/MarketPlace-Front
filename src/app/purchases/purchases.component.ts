import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  products : [Product] |undefined;

  constructor() { }

  ngOnInit(): void {
    this.LoadPurchases();
  }
  LoadPurchases(){
    var data = JSON.stringify({});

    var config = {
      method: 'get',
      url: 'http://localhost:5062/purchase/getClient/',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("authToken"),
        'Content-Type': 'application/json'
      },
      data : data
    };
    let instance = this
    axios(config)
    .then(function (response) {
      instance.products = response.data
    })
    .catch(function (error) {
      console.log(error);
    });
  }

}
