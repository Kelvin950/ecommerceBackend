import { Schema, model  } from 'mongoose';
import {IUser} from './interfaces'

// 1. Create an interface representing a document in MongoDB.


// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password:{type:String , required:true} ,
  address:{type:String , required:true} , 
  role:{type:String , enum:["Buyer" , "Admin" , "Vendor"]  ,required:true }, 
  shop:{type:Schema.Types.ObjectId , ref:"Shop"} ,
  orders:[{type:Schema.Types.ObjectId , ref:"Order"}]
} , {
  timestamps:true
});

// 3. Create a Model.
export default model<IUser>('User', userSchema);