import { Component, OnInit } from '@angular/core';
import {Product} from '../products';
import { Route, Router } from '@angular/router';
import axios from "axios";
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-address-register',
  templateUrl: './address-register.component.html',
  styleUrls: ['./address-register.component.css']
})
export class AddressRegisterComponent implements OnInit {

  titlePage="Address register"
  product : Product | undefined

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  save(){
    let street =document.getElementById("street") as HTMLInputElement;
    let state =document.getElementById("state") as HTMLInputElement;
    let city =document.getElementById("city") as HTMLInputElement;
    let country =document.getElementById("country") as HTMLInputElement;
    let postal_code =document.getElementById("postal_code") as HTMLInputElement; 

    let dados = JSON.parse(String(localStorage.getItem("user")));
    console.log(typeof(dados));
    var data = JSON.stringify({
      "name" : dados.name,
      "phone" : dados.phone,
      "document" : dados.document,
      "email" : dados.email,
      "login" : dados.login,
      "passwd" : dados.passwd,
      "date_of_birth" : dados.date_of_birth,
      "address" : {
        "street" : street?.value,
        "state" : state?.value,
        "city" : city?.value,
        "country" : country?.value,
        "postal_code" : postal_code?.value

      }

    
    })
    if(dados.typeofuser==1){
      let self = this;
      var config = {
        method: 'post',
        url: 'http://localhost:5062/client/register',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data

      }
      axios(config)
      .then(function (response) {
        localStorage.removeItem("user")
        self.router.navigate(['login'])
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else if(dados.typeofuser==2){
      let self = this;
      var config = {
        method: 'post',
        url: 'http://localhost:5062/owner/register',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data

      }
      axios(config)
      .then(function (response) {
        localStorage.removeItem("user")
        self.router.navigate(['login'])
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
  
  }
}
