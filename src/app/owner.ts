export type Owner = {
    id:number,
    name: string;
    phone: string;
    email: string;
    passwd: string;
    login: string;
    date_of_birth: string;
    document: string;
    address:{
      id:number;
      street:string;
      city:string;
      state:string;
      country:string;
      postal_code:string;
    }
  };