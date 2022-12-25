interface message{

   location?:string ;
   param:string ;
   message:string
}

export default abstract class  AbsError extends Error{
    abstract statusCode:number;

          constructor(msg:string){
            //   this.message =  msg;
              super(msg)
             
              Object.setPrototypeOf(this, AbsError.prototype);
          }


          abstract serializeError():message[];

}