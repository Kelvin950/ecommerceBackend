import express ,{Request , Response } from 'express';
import "module-alias/register"
import ErrorHandler from '@middleWares/ErrorHandler';
import Error404 from '@errors/Error404';
import "express-async-errors"
import  {productRoute} from '@productRoutes/create'
import {UserRoute} from '@userRoutes/signup'
import "dotenv/config";
import cookieParser  from 'cookie-parser';
// import isAuth from '@middleWares/ISAuth';
import Auth , {Payload}from '@helpers/Auth/Auth';
import jwt from 'jsonwebtoken';
import User from '@models/User';
import AuthError from '@errors/AuthError';
const app =  express();
 
app.use(cookieParser());

app.use(express.json());
app.use(express.static("public"));

app.use("/refreshToken" , async (req:Request , res:Response)=>{

    const {refreshToken} =  req.cookies ; 
         
    if(!refreshToken){
        throw new AuthError("You are not authenticated");
    }

     
       
         const payload   = jwt.verify(refreshToken , process.env.REFRESHKEY!) as Payload ; 
            
         console.log(payload);
    
const user =  await  User.findById(payload.userID) ; 

if(!user){
    throw new AuthError("You are not authenticated");
}



res.status(200).send({accessToken:Auth.createAccessToken({userID:payload.userID , email:payload.email})})
    

});
app.use(productRoute);
app.use(UserRoute);


app.use(ErrorHandler);



app.use("*" , (req:Request , res:Response)=>{
  
    const error =  new Error404("resource not found");
    
    res.status(error.statusCode).send(error.serializeError());

});

export {app}