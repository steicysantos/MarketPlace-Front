import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {

  titlePage="Client Register";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  save(){

    let name = document.getElementById("name") as HTMLInputElement;
    let phone = document.getElementById("phone") as HTMLInputElement;
    let documenton = document.getElementById("document") as HTMLInputElement;
    let email = document.getElementById("email") as HTMLInputElement;
    let login = document.getElementById("login") as HTMLInputElement;
    let passwd = document.getElementById("passwd") as HTMLInputElement;
    let date_of_birth = document.getElementById("date_of_birth") as HTMLInputElement;
    var ele = document.getElementsByTagName('input');
    var typeofuser;
    for(var i = 0; i < ele.length; i++) {
                  
      if(ele[i].type="radio") {
        
          if(ele[i].checked){
            typeofuser=ele[i].value
          }
          else{
            typeofuser=1
          }
              
      }
  }
  
    var data = JSON.stringify({
      "name" : name?.value,
      "phone" : phone?.value,
      "document" : documenton?.value,
      "email" : email?.value,
      "login" : login?.value,
      "passwd" : passwd?.value,
      "date_of_birth" : date_of_birth?.value,  
      "typeofuser":typeofuser
    })
    localStorage.setItem("user",data);
    let self = this;
    self.router.navigate(['address-register'])  
  }
  
}
