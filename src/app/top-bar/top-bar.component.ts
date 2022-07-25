import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import axios from 'axios';
import { Client } from '../client';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
@Input() titulo =  "";
  constructor(private router: Router) {
    
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
    let self=this
    this.Token = null;
    this.TokenOwner = null;

    localStorage.removeItem('authToken');
    localStorage.removeItem('authOwner');

    self.router.navigate(['/'])
  }

}
