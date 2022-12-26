import bull from "bull";
import {processes} from './process';

const emailQueue =  new bull("email",{
    redis:process.env.redis_url!
}) ;

emailQueue.process(processes);

const sendEmail =(data:any)=>{


    emailQueue.add(data);
}