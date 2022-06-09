import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titlePage="Login";
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    let login = document.getElementById("login") as HTMLInputElement;
    let senha = document.getElementById("senha") as HTMLInputElement;

    var data = JSON.stringify({
      "login": login?.value,
      "passwd": senha?.value
    });
    let self = this;
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
      localStorage.removeItem('authOwner');
      self.router.navigate(['']);
    })
    .catch(function (error:any) {
      console.log(error);
    });

    var config2 = {
      method: 'post',
      url: 'http://localhost:5062/owner/api',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config2)
    .then(function (response:any) {
      localStorage.setItem('authOwner',response.data);
      localStorage.removeItem('authToken');
      self.router.navigate(['']);
    })
    .catch(function (error:any) {
      console.log(error);
    });

  }

}
