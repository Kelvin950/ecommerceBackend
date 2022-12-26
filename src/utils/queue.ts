import bull from "bull";


const emailQueue =  new bull("email",{
    redis:process.env.redis_url!
}) ;


const sendEmail =(data:any)=>{


    emailQueue.add(data);
}