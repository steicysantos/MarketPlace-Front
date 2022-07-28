import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  products : [Product] |undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if(token==null){
      this.router.navigate(['']);
    }
    this.LoadProducts();
  }


  LoadProducts(){
    var data = JSON.stringify({});

    var config = {
      method: 'get',
      url: 'http://localhost:5062/wishlist/getwishlist',
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
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  RemoveWishList(WishListId:number){
    var config = {
      method: 'delete',
      url: 'http://localhost:5062/wishlist/delete/' + WishListId,
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem("authToken"),
      }
    };
    let instance = this;
    axios(config)
    .then(function (response: any) {
      console.log(JSON.stringify(response.data));
      window.location.reload();
    })
    .catch(function (error : any) {
      console.log(error);
    });
  }



}

