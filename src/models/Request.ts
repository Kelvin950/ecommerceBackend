import {model, Schema} from 'mongoose';
import {Request} from './interfaces';


const requestSchema =  new Schema<Request>({

    User:{
        type:Schema.Types.ObjectId , ref:"User"
    } ,




} ,{
    timestamps:true
}) ; 



export default model("Request" , requestSchema);