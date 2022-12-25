import Shop  from "@models/Shop";
import BadRequestError from "@errors/BadRequestError";
import{Response , Request} from 'express'

const createShop = async (req:Request,res:Response)=> {
 
       const {name , address } =  req.body;  

       const shop =  await Shop.createShop(
        {name  ,address}
       );

        
       res.status(200).send({
        message:"done" ,
        data:shop
       })


     


    
}

