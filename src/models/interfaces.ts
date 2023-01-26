
import mongoose, { Types } from "mongoose";

export enum Role{
   
    Buyer="Buyer" , 
    Admin =  "Admin",
    Vendor ="Vendor"

}
 export interface IUser {
  name: string;
  email: string;
  role:Role;
  shop?:mongoose.Types.ObjectId;
  password:string;
  address?:string;
  createdAt:Date
    orders?:Types.DocumentArray<Types.ObjectId> ,
    pin :number
}


export interface Request{

    user:Types.ObjectId ,
    createdAt:Date
}
export interface IShop{

name:String ,
createdAt:Date,
products?:mongoose.Types.DocumentArray<Types.ObjectId>,
Vendor:Types.ObjectId,
address:string

}

export interface Iproduct {
  title: string;
  price: string;
  description: string;
  image: string;
  Vendor:Types.ObjectId,
  Shop:Types.ObjectId
}

export interface Iproductsub {
  product: Types.ObjectId;
  quantity: number;
}
 export interface Iorder {
  products: Iproductsub[];
  user: Types.ObjectId; 

  totalPrice:number ,
  createdAt:Date
}