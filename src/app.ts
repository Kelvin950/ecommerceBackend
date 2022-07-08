import express ,{Request , Response } from 'express';
import "module-alias/register"
import ErrorHandler from '@middleWares/ErrorHandler';
import Error404 from '@errors/Error404';
import "express-async-errors"
import  {productRoute} from '@productRoutes/create'
import "dotenv/config"
const app =  express();


app.use(express.json());
app.use(productRoute);


app.use(ErrorHandler);

app.use("*" , (req:Request , res:Response)=>{
  
    const error =  new Error404("resource not found");
    
    res.status(error.statusCode).send(error.serializeError());

});

export {app}