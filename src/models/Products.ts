import mongoose, { Schema, model , Model, HydratedDocument } from "mongoose";
import { Iproduct } from "./interfaces";

interface attrs{

    title:string ,
    price:string ,
    description:string ,
    image:string 
}

interface productModel extends Model<Iproduct>{

    createShop(attrs:attrs):Promise<HydratedDocument<Iproduct>>
}

const productSchema = new Schema<Iproduct>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  image: String,
});



export default model<Iproduct>("Product", productSchema);
