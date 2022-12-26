import Shop  from "@models/Shop";
import BadRequestError from "@errors/BadRequestError";
import User from '@models/User';
import RequestModel from '@models/Request';
import {sendEmail} from '@utils/queue'
import{Response , Request} from 'express'


export const createShop = async (req:Request,res:Response)=> {
 
       const {name , address } =  req.body;  

       const isshop =  await Shop.findOne(name);
       if(!isshop){
        throw new BadRequestError("shop incorrect or already exists");
       }
       const shop =  await Shop.createShop(
        {name  ,address ,Vendor:req.user.id}
       );


       await shop.save();
        
       res.status(200).send({
        message:"done" ,
        data:shop
       })


     


    
}

export const requestForShop =async (req:Request, res:Response) => {
        

        
//     const user =  await User.findById(req.user.id);

//      if(user?.shop)
//                 throw new BadRequestError("Already owns a shop");

    
//     const isRequest = await RequestModel.findOne({user:req.user.id}) ;
// console.log(isRequest);
//     if(isRequest)
//         throw new BadRequestError("You have already asked for a shop");
    
//     const request=  await RequestModel.create({
//         user:req.user.id 
//     }) ;

//     await request.save();
      
 sendEmail({
   to: req.user.email, // Change to your recipient
   from: process.env.verifiedSender, // Change to your verified sender
   subject: "Sending with SendGrid is Fun",
   text: "and easy to do anywhere, even with Node.js",
   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
 });
    res.status(201).send({
        message:"done" ,data:{
            request:"request sent"
        }
    })
       
}

