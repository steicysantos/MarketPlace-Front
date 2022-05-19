import { Component, OnInit } from '@angular/core';
import { products } from '../../products';
import axios from 'axios';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
products = products;
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
    axios(config).then(function (response: { data: { id: number; name: string; price: number; description: string; image: string; }[]; }) {
      instance.products = response.data;
    })
    .catch(function (error: any) {
      console.log(error);
    });
  
  }
}