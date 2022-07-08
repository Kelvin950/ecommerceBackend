import  {Schema , model , Types , Model} from 'mongoose'; 

interface product{
    product:Types.ObjectId ;
    quantity:number;
}
interface order {
   products:product[] ;
   user:Types.ObjectId;
}

const productsSchema = new Schema<product>({
    product:{
        type:Schema.Types.ObjectId ,
        required:true ,
    }
     , 
quantity:{
    type:Number , required:true,
}

})

type orderDocProps = {
    user:Types.ObjectId , 
    products:Types.DocumentArray<product>
}

type orderModelType = Model<order , {} ,orderDocProps>;

const orderSchema =  new Schema<order>({

    user:{
        type: Schema.Types.ObjectId  ,
        ref:"User"
    } ,


    products:[
       productsSchema
    ]
});


export default model<order , orderModelType>("Order" , orderSchema);