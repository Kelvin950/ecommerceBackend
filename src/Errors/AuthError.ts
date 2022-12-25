import AbsError from './AbstractError';


export default class AuthError extends AbsError{

   public statusCode =  403;

   constructor(private msg:string){
       super(msg)

        Object.setPrototypeOf(this , AuthError.prototype);
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