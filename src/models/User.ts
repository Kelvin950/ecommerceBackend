import { Schema, Model  , HydratedDocument ,model } from 'mongoose';
import {IUser, Role} from './interfaces'


interface Attrs{
  name:string ,
  email:string ,
  password:string  ,
  address?:string ,
  role:Role
}
interface UserModel extends Model<IUser>{

   createUser(attrs:Attrs):Promise<HydratedDocument<IUser>>


}
const userSchema = new Schema<IUser , UserModel>({
  name: { type: String, required: true  , unique:true},
  email: { type: String, required: true , unique:true},
  password:{type:String , required:true} ,
  address:{type:String , required:true} , 
  role:{type:String , enum:["Buyer" , "Admin" , "Vendor"]  ,required:true }, 
  shop:{type:Schema.Types.ObjectId , ref:"Shop"} ,
  orders:[{type:Schema.Types.ObjectId , ref:"Order"}] ,
  pin:Number
} , {
  timestamps:true
});

userSchema.static("createUser" , (attrs:Attrs)=>{
  return new User(attrs);
} )

// 3. Create a Model.
 const User =  model<IUser , UserModel>('User', userSchema);
 export default User;