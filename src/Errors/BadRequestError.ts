
import AbsError from './AbstractError'
export default  class BadRequestError extends AbsError{

    public statusCode =  401;

    constructor(  msg:string){

         super(msg);

         Object.setPrototypeOf(this , BadRequestError.prototype);
    }


    serializeError(){

        return [
            {
                location:"" ,
                param:"" ,
                 message:this.message
            }
        ]
    }


}