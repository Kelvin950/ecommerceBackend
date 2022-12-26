import Shop  from "@models/Shop";
import BadRequestError from "@errors/BadRequestError";
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
        

    
      

}

