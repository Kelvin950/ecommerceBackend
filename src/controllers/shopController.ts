import Shop  from "@models/Shop";
import BadRequestError from "@errors/BadRequestError";
import AuthError from "@errors/AuthError";
import User from '@models/User';
import RequestModel from '@models/Request';
import {sendEmail} from '@utils/queue'
import{Response , Request} from 'express'
import {Iproduct ,IUser ,Role} from '@models/interfaces'

export const createShop = async (req:Request,res:Response)=> {
 
       const {name , address } =  req.body;  
      const user = await User.findById(req.user.id); 
      if(user?.role !== Role.Buyer){
           throw  new AuthError("You are not a vendor");
         
      } 
      
      if(user.shop){
        throw new AuthError("You already own a shop");
      }



       const isshop =  await Shop.findOne({name:name});
       if(isshop){
        throw new BadRequestError("shop incorrect or already exists");
       }
       const shop =  await Shop.createShop(
        {name  ,address ,Vendor:req.user.id}
       );

                
       await shop.save();

     await user.set("shop", shop.id).save();
        
       res.status(200).send({
        message:"done" ,
        data:shop
       })


     


    
}

export const requestForShop =async (req:Request, res:Response) => {
        

        
    const user =  await User.findById(req.user.id);

     if(user?.shop)
                throw new BadRequestError("Already owns a shop");

    
    const isRequest = await RequestModel.findOne({user:req.user.id}) ;
console.log(isRequest);
    if(isRequest)
        throw new BadRequestError("You have already asked for a shop");
    
    const request=  await RequestModel.create({
        user:req.user.id 
    }) ;

    await request.save();
      
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


export const viewShop = async(req:Request,res:Response)=>{
 
    const shop = await Shop.findOne({Vendor:req.user.id}).populate<Iproduct[]>("products");
    if(!shop){
        throw new BadRequestError("User does not own a shop");
    }
        
      
    res.status(200);
    res.send({message:"done" ,data:shop})


     


    
}

export const viewShopById = async(req:Request , res:Response)=>{
 
    const shop =  await Shop.findById(req.params.shopId).populate<Iproduct[]>("products").populate<IUser>("Vendor");
    if(!shop){
        throw new BadRequestError("shop does not exist");
    
     } 


     res.status(200).send({message:"done" , data:shop});
      
    

    }

