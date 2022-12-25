import mongoose, {mongo, Schema , Types} from  'mongoose'
import  {IShop} from './interfaces'

const shopSchema =  new Schema<IShop>({

    name:{
        type:String , required:true
    }  ,
    Vendor:{
        type:Schema.Types.ObjectId , required:true , ref:"User"
    } ,
    address:{
        type:String , required:true
    } ,
    products:[
        {type:Schema.Types.ObjectId , required:true ,ref:"Product"} 
    ]

} , {
    timestamps:true
})  ; 



const Shop =  mongoose.model<IShop>("Shop" ,shopSchema );
export default Shop;