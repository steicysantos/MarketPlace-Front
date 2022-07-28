import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {Store} from '../store';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.css']
})
export class RegisterStoreComponent implements OnInit {

  store: Store;
  constructor(private router: Router) { 
    this.store = {
      name: "",
      cnpj: "",
    };
  }

  ngOnInit(): void {
    const token = localStorage.getItem('authOwner');
    this.getOwnerStores()
    if(token==null){
      this.router.navigate(['']);
    }
  }

  async getOwnerStores(){
    var config = {
      method: 'get',
      url: 'http://localhost:5062/store/getStores/' ,
      headers: { 
        'Authorization': 'Bearer ' +  localStorage.getItem("authOwner")
      }
    };
   var response = await axios(config);

    this.store = response.data;
  }

  save(){
    let cnpj =document.getElementById("cnpj") as HTMLInputElement;
    let name =document.getElementById("name") as HTMLInputElement;

    var data = JSON.stringify({
      "cnpj" : cnpj?.value,
      "name" : name?.value    
    })
      let self = this;
      var config = {
        method: 'post',
        url: 'http://localhost:5062/store/register',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem("authOwner")
        },
        data : data

      }
      console.log(self.store.name)
      if(self.store.name!=""){
        axios(config)
        .then(function (response) {
          alert("Loja cadastrada")
          self.router.navigate(['/register/product'])
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else{
        alert("Você ja possui loja cadastrada.")
        self.router.navigate(['/register/product'])
      }
      
    
    
  
  }


}
