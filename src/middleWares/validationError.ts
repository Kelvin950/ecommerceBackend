import {Request ,Response , NextFunction} from 'express'
import  ValidationError from '@errors/ValidationReq';
import {validationResult} from "express-validator";



export default (req:Request , res:Response , next:NextFunction)=>{

const errors= validationResult(req) ;

  if(!errors.isEmpty()){
       throw new ValidationError(errors.array());          
  }
     
  next();
}