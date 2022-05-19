export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image:string;
}

export const products = [
  {
    id: 1,
    name: 'Phone XL',
    price: 799,
    description: 'A large phone with one of the best screens',
    image:'../assets/celular.jpg'
  },
  {
    id: 2,
    name: 'Phone Mini',
    price: 699,
    description: 'A great phone with one of the best cameras',
    image:'../assets/celular2.jpg'
  },
  {
    id: 3,
    name: 'Phone Standard',
    price: 299,
    description: '',
    image:'../assets/celular.jpg'
  }
];


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/