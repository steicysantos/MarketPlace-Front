import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {

  titlePage="Login";
  constructor() { }

  ngOnInit(): void {
  }

  login(){
    let login = document.getElementById("login") as HTMLInputElement;
    let senha = document.getElementById("senha") as HTMLInputElement;

    var data = JSON.stringify({
      "login": login?.value,
      "passwd": senha?.value
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5062/client/api',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response:any) {
      localStorage.setItem('authToken',response.data);
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error:any) {
      console.log(error);
    });

  }

}
