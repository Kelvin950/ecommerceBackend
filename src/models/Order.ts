import  {Schema , model , Types , Model} from 'mongoose'; 
import {Iorder ,Iproductsub} from './interfaces'


const productsSchema = new Schema<Iproductsub>({
    product:{
        type:Schema.Types.ObjectId ,
        required:true ,
        ref:"Product"
    }
     , 
quantity:{
    type:Number , required:true,
}

})

type orderDocProps = {
    user:Types.ObjectId , 
    products:Types.DocumentArray<Iproductsub>,
    totalPrice:number ,
    createdAt:Date

}

type orderModelType = Model<Iorder , {} ,orderDocProps>;

const orderSchema =  new Schema<Iorder , orderModelType>({

    user:{
        type: Schema.Types.ObjectId  ,
        ref:"User",
        required:true
    } ,


    products:[
       productsSchema
    ]
     ,

    totalPrice:{
        type:Number ,
        required:true
    } ,

} , {
    timestamps:true
});


export default model<Iorder , orderModelType>("Order" , orderSchema);