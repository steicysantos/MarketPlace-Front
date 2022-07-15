import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  products : [Product] |undefined;
  userID: number;
  constructor() {
    this.userID=1;
   }

  ngOnInit(): void {
    this.LoadSales();
  }


  LoadSales(){
    var data = JSON.stringify({});



    var config = {
      method: 'get',
      url: 'http://localhost:5062/purchase/getStore/',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("authOwner"),
        'Content-Type': 'application/json'
      },
      data : data
    };
    let instance = this
    axios(config)
    .then(function (response) {
      instance.products = response.data
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

}
