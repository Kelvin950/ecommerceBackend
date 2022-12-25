import mongoose, {Schema ,model} from 'mongoose';

interface product {
     
    title:string ;
    price:string ;
    description:string ;
    image:string;
}


const productSchema =  new Schema<product>({


    title:{
        type:String  ,
        required:true
    } ,
    price:{
        type:String ,
        required:true
    } ,
    description:{
        type:String ,
        required:true 
    } ,

    image:String
})



export default model<product>("Product" , productSchema)