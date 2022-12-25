import {Request , Response , NextFunction} from 'express'
import  AbsError from '@errors/AbstractError' ;


export default  (error:Error  , req:Request ,res:Response , next:NextFunction )=>{

     if(error instanceof  AbsError){
          
        return res.status(error.statusCode).send(error.serializeError());
         
     }

console.log(error);
    res.status(500).send({
        error:"Internal Server error"
    })

}

