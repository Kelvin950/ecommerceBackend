import express ,{Request , Response } from 'express';
import "module-alias/register"
import ErrorHandler from '@middleWares/ErrorHandler';
import Error404 from '@errors/Error404';
import "express-async-errors"
import  {productRoute} from '@productRoutes/create'
import {UserRoute} from '@userRoutes/signup'
import "dotenv/config";
import cookieParser  from 'cookie-parser';

const app =  express();
 
app.use(cookieParser());

app.use(express.json());
app.use(express.static("public"));
app.use(productRoute);
app.use(UserRoute);


app.use(ErrorHandler);

app.use("*" , (req:Request , res:Response)=>{
  
    const error =  new Error404("resource not found");
    
    res.status(error.statusCode).send(error.serializeError());

});

export {app}