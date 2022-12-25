import Shop  from "@models/Shop";
import BadRequestError from "@errors/BadRequestError";
import{Response , Request} from 'express'

export const createShop = async (req:Request,res:Response)=> {
 
       const {name , address } =  req.body;  

       const shop =  await Shop.createShop(
        {name  ,address ,Vendor:req.user.id}
       );

        
       res.status(200).send({
        message:"done" ,
        data:shop
       })


     


    
}

