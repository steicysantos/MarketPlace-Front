import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import axios from 'axios';
import { Client } from '../client';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
@Input() titulo =  "";
  constructor() {
    
    this.Token = localStorage.getItem('authToken');

  this.Id = Number(localStorage.getItem('id'));

  this.TokenOwner = localStorage.getItem('authOwner');

  this.ClientName = localStorage.getItem('clientName');

  this.OwnerName = localStorage.getItem('ownerName');

}

  Token : String | null;
  Id : Number;
  TokenOwner : String | null;
  ClientName : String | null;
  OwnerName : String | null;



  ngOnInit(): void {

  }
  logout(){
    this.Token = null;
    this.TokenOwner = null;

    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenOwner');
  }

}
