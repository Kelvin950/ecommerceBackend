import {model, Schema} from 'mongoose';
import {Request} from './interfaces';


const requestSchema =  new Schema<Request>({

    user:{
        type:Schema.Types.ObjectId , ref:"User", required:true
    } ,




} ,{
    timestamps:true
}) ; 



export default model<Request>("Request" , requestSchema);