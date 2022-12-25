import mongoose, {HydratedDocument, Model, mongo, Schema , Types} from  'mongoose'
import  {IShop} from './interfaces'


interface attrs{
    name:string;
    Vendor:Types.ObjectId ,
    address:string,
    
}

interface ShopModel extends Model<IShop>{
    
    createShop(attrs:attrs):Promise<HydratedDocument<IShop>>
}
const shopSchema =  new Schema<IShop , ShopModel>({

    name:{
        type:String , required:true ,unique:true,
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


shopSchema.static("createShop" , (attrs:attrs)=>{
    return new Shop(attrs) ;
})



const Shop =  mongoose.model<IShop , ShopModel>("Shop" ,shopSchema );
export default Shop;