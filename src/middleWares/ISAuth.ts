import  {Request , Response , NextFunction} from 'express';
import jwt from  'jsonwebtoken';
import  AuthError from '@errors/AuthError';
import { verify } from 'crypto';
import { nextTick } from 'process';


interface Payload{

    email:string ,
    name:string,
    id:string

}
declare global{
    namespace Express{
        interface  Request{
            user:Payload
        }
    }
}

export default {



 isAuth :async (req:Request ,res:Response ,next:NextFunction)=>{
        
     const headers  = req.headers.authorization!; 

    const  [_ , token] =  headers.split(" "); 

    if(!token){
        throw new AuthError("not logged in");
    }


    try{
        const user = jwt.verify(token , process.env.JWTSECRET!) as Payload;
            req.user =  user ;

    }catch(err){
        console.log(err)
        throw  new AuthError("User not found or you are not logged in");
    }

        next(); 
 }
            
         
     
         
         

  

    

} 