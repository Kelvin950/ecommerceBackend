import Shop  from "@models/Shop";
import BadRequestError from "@errors/BadRequestError";
import User from '@models/User';
import RequestModel from '@models/Request';
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
        

        
    const user =  await User.findById(req.user.id);

     if(user?.shop)
                throw new BadRequestError("Already owns a shop");

    
    const isRequest = await RequestModel.find({User:req.user.id}) ;

    if(isRequest)
        throw new BadRequestError("You have already asked for a shop");
    
    const request=  await RequestModel.create({
        user:req.user.id 
    }) ;

    await request.save();


}

