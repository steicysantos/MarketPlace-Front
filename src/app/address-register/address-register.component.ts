import { Component, OnInit } from '@angular/core';
import {Product} from '../../products';

@Component({
  selector: 'app-address-register',
  templateUrl: './address-register.component.html',
  styleUrls: ['./address-register.component.css']
})
export class AddressRegisterComponent implements OnInit {

  titlePage="address register"
  product : Product | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
