
import mongoose, { Types } from "mongoose";

enum Role{
   
    Buyer="Buyer" , 
    Admin =  "Admin",
    Vendor ="Vendor"

}
 export interface IUser {
  name: string;
  email: string;
  role:Role;
  shop:mongoose.Types.ObjectId;
  password:string;
  address:string;
  createdAt:Date
    orders:Types.DocumentArray<Types.ObjectId>
}


export interface IShop{

name:String ,
createdAt:Date,
products:mongoose.Types.DocumentArray<Types.ObjectId>,
Vendor:Types.ObjectId,
address:string

}

export interface Iproduct {
  title: string;
  price: string;
  description: string;
  image: string;
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