import { Component, OnInit } from '@angular/core';
import { Route, Router,ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Client } from '../client';
import {Owner} from '../owner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  iduser:number| null;
  idend:number | null;
  token : String | null;
  authToken : String | null;
  authTokenOwner : String | null;
  client: Client;
  owner:Owner;
  editPersonal : boolean = false
  editAddress : boolean = false

  constructor(private route: ActivatedRoute,private router: Router) { 
    this.client = {
      id:0,
      name :  "",
      phone : "",
      email: "",
      passwd: "",
      login: "",
      date_of_birth: "",
      document: "",
      address:{
        id:0,
        street:"",
        city:"",
        state:"",
        country:"",
        postal_code:"",   
      }
    };
    this.owner = {
      id:0,
      name :  "",
      phone : "",
      email: "",
      passwd: "",
      login: "",
      date_of_birth: "",
      document: "",
      address:{
        id:0,
        street:"",
        city:"",
        state:"",
        country:"",
        postal_code:"",        
      }
  }
  this.token='';
  this.idend=0;
  this.iduser=0;
  this.authToken = localStorage.getItem('authToken');

  this.authTokenOwner = localStorage.getItem('authOwner');
  }

  ngOnInit(): void {
    let teirep=localStorage.getItem("authOwner");
    let periet=localStorage.getItem("authToken");
    if(periet!=null){
      this.getClient();
    }
    else if(teirep==null && periet==null){
      this.router.navigate(['']);
    }
    else{
      this.getOwner();
    }

    this.disableInputs('address')
    this.disableInputs('personal')

  }
  async getClient(){
    var config = {
      method: 'get',
      url: 'http://localhost:5062/client/get',
      headers: { 
        'Authorization': 'Bearer ' +  localStorage.getItem("authToken"),
      }
    };

    var response = await axios(config);
    this.client = response.data;
    this.idend=this.client.address.id;
    this.iduser=this.client.id;
    this.client.date_of_birth = this.client.date_of_birth.substring(0, 10).toString();
    this.disableInputs('address')
    this.disableInputs('personal')
  }
  async getOwner(){
    var config = {
      method: 'get',
      url: 'http://localhost:5062/owner/get' ,
      headers: { 
        'Authorization': 'Bearer ' +  localStorage.getItem("authOwner"),
      }
    };
    var response = await axios(config);
    
    this.owner = response.data;
    this.idend=this.owner.address.id;
    this.iduser=this.owner.id;
    this.owner.date_of_birth = this.owner.date_of_birth.substring(0, 10).toString();
    this.disableInputs('address')
    this.disableInputs('personal')
  }

disableInputs(name:string){
    //Desabilita todos os inputs
    var inputs = document.querySelectorAll("input")
    for(var i = 0; i< inputs.length; i++){
      if(inputs[i].name == name)
           inputs[i].disabled =  true
    }
  }


  allowEdit(name :string) {
    var inputs = document.querySelectorAll("input")
  
    for(var i = 0; i< inputs.length; i++){
      if(inputs[i].name == name)
           inputs[i].disabled =  false
    }
    if(name == 'address')
      this.editAddress = true
    if(name == 'personal')
      this.editPersonal = true
    
  }

  saveEdits(name :string){
    let nome = document.getElementById("nome") as HTMLInputElement;
    let phone = document.getElementById("phone") as HTMLInputElement;
    let documenton = document.getElementById("document") as HTMLInputElement;
    let email = document.getElementById("email") as HTMLInputElement;
    let login = document.getElementById("login") as HTMLInputElement;
    let passwd = document.getElementById("passwd") as HTMLInputElement;
    let date_of_birth = document.getElementById("date_of_birth") as HTMLInputElement;

    let street =document.getElementById("street") as HTMLInputElement;
    let state =document.getElementById("state") as HTMLInputElement;
    let city =document.getElementById("city") as HTMLInputElement;
    let country =document.getElementById("country") as HTMLInputElement;
    let postal_code =document.getElementById("postal_code") as HTMLInputElement; 



    if(name == 'address'){
    this.editAddress = false
    var data = JSON.stringify({
        "street" : street?.value,
        "state" : state?.value,
        "city" : city?.value,
        "country" : country?.value,
        "postal_code" : postal_code?.value    
    })

    if(this.authToken!=null){
      this.token=this.authToken;
    }
    else{
      this.token=this.authTokenOwner
    }
    let self = this;
      var config = {
        method: 'put',
        url: 'http://localhost:5062/address/update/'+this.idend,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  self.token,
        },
        data : data

      }
      axios(config)
      .then(function (response) {
        // self.router.navigate(['login'])
      })
      .catch(function (error) {
        console.log(error);
      });
  }
    if(name == 'personal'){
      this.editPersonal = false
      var data = JSON.stringify({
        "name" : nome?.value,
        "phone" : phone?.value,
        "document" : documenton?.value,
        "email" : email?.value,
        "login" : login?.value,
        "passwd" : "",
        "date_of_birth" : date_of_birth?.value
      })
      
      if(this.authToken!=null){
        let self = this;
        var config = {
        method: 'put',
        url: 'http://localhost:5062/client/update/'+this.iduser,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  self.authToken,
        },
        data : data

      }
      axios(config)
      .then(function (response) {
        // self.router.navigate(['login'])
      })
      .catch(function (error) {
        console.log(error);
      });
      }
      else{
        let self = this;
        var config = {
        method: 'put',
        url: 'http://localhost:5062/owner/update/'+this.iduser,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  self.authTokenOwner,
        },
        data : data

      }
      axios(config)
      .then(function (response) {
        // self.router.navigate(['login'])
      })
      .catch(function (error) {
        console.log(error);
      });


      }
      

    }
      
    
      this.disableInputs(name)
    
  }


}
