import AbsError from './AbstractError' ;
import {ValidationError} from 'express-validator';


export default class ValidationReq extends AbsError{

     statusCode = 400;

     constructor(private error:ValidationError[]){

        super("Invalid input");
        Object.setPrototypeOf(this,  ValidationReq.prototype)
     }


     serializeError(){
      
        return this.error.map((e)=>{
            return {
                location:e.location ,
                param:e.param ,
                message:e.msg
            }
        })
     }

}