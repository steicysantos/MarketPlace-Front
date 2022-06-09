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

    
  
    var data = JSON.stringify({
      "name" : name?.value,
      "phone" : phone?.value,
      "document" : documenton?.value,
      "email" : email?.value,
      "login" : login?.value,
      "passwd" : passwd?.value,
      "date_of_birth" : date_of_birth?.value
    })
    localStorage.setItem("user",data);
    let self = this;
    self.router.navigate(['address-register'])  
  }
  mascara(t:any, mask:any){
    var i = t.value.length;
    var saida = mask.substring(1,0);
    var texto = mask.substring(i)
    if (texto.substring(0,1) != saida){
    t.value += texto.substring(0,1);
    }
    }
}
