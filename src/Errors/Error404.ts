import AbsError from './AbstractError';

export default class Error404 extends AbsError{


    statusCode =  404 ;

    constructor(msg:string){
        
        super(msg);
        
        Object.setPrototypeOf(this , Error404.prototype);
    }


    serializeError(){


        return [
            {
                location:"",
                param:"",
                message:this.message,
            }
        ]
    }


}

