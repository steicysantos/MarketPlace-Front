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

}