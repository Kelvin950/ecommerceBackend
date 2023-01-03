import AuthError from '@errors/AuthError';
import  Order from '@models/Order';
import User from '@models/User';
import {Request , Response} from 'express'

const createOrder =async (req:Request ,res:Response)=>{

       
    const {totalPrice , products }  = req.body ; 


    const order = await Order.create({
        user:req.user.id , totalPrice , products
    })  ; 

    await order.save();


    const user =  await User.findById(req.user.id) ; 
            if(!user){
                throw new AuthError("user does not exist");
            }
           user?.orders?.push(order.id);
     
   await user.save();
   
   
   res.status(200).send({
    message:"done" , 
    data:{
        order
    }
   })
       




       
    

}