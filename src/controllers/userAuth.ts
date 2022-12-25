import {Request , Response} from 'express';
import axios from 'axios';
import qs from 'qs';
import User from '@models/User';
import createToken from '@helpers/Auth/Auth';
import  bcrypt from   'bcrypt';
import {Role} from '@models/interfaces'
import BadRequestError from '@errors/BadRequestError';
import AuthError from '@errors/AuthError';
import jwt from 'jsonwebtoken'
interface GoogleAuth{
    access_token:string ,
    expires_in:number ,
    refresh_token:string ,
    scope:string ,
    token_type:string ,
    id_token:string
}
interface GoogleUserRes{
   
        id: string;
        email: string;
        verified_email: boolean;
        name: string;
        given_name: string;
        family_name: string;
        picture: string;
        locale: string;
      
};
export const googleAuth=async(
    req:Request ,res:Response
)=>{

    //get the  code from  query string
    const code =  req.query.code as string ;
console.log(code);
    //get the id and access token with the code
const values = {
    code ,
    client_id:process.env.GOOGLE_CLIENTID!  ,
    client_secret:process.env.GOOGLE_CLIENTSECRET! ,
    redirect_uri:process.env.GOOGLEREDIRECTURL!,
    grant_type: "authorization_code"
} ;
 
const {data:{access_token , id_token}}=  await axios.post<GoogleAuth>("https://oauth2.googleapis.com/token" ,qs.stringify(values) ,  {
    headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    } 
}) ;
// console.log(response.data.id_token);

    //get user with tokens
const{data:{name ,email}} =  await axios.get<GoogleUserRes>(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,{
    headers:{
        "Authorization":`Bearer ${id_token}`
    }
}) ;

// console.log();


    //upsert the user

const user =  await User.findOneAndUpdate({email:email} , {name , email} , {upsert:true , new:true})
    //create a session

    //create access and refresh token
  res.cookie("refreshToken" ,createToken.createRefreshToken({userID:user.id , email:email}) ,{httpOnly:true}) ; 
          


    //set coookies and redirect back to client
    res.status(200).send({
        accessToken:createToken.createAccessToken({userID:user.id , email:email})
    })
  
}


export const signup=async (req:Request , res:Response) => {


    const {name , email ,password, address} =  req.body ;  
           
                      
      const isname = await User.findOne(name);
      if (!isname) {
        throw new BadRequestError("Bad input or name in used");
      }   
      const isemail = await User.findOne(email);
      if (!isemail) {
        throw new BadRequestError("Bad input or email in used");
      } 

        const salt  =  await bcrypt.genSalt(10);
      const hashpass =  await bcrypt.hash(password , salt) ;
  

      const user =  await  User.createUser({
        name , email , password:hashpass , address ,role:Role.Buyer 
      }) ; 

        
      res.send(201).send({
        message:"done" , data:user
      })

    
}

export const login = async (req:Request,res:Response )=>{

       
    const {email , password} =  req.body ;

    const user = await User.findOne(email);
    if(!user){
        throw new AuthError("email or password incorrect");

    }

    const hashpassword =  await bcrypt.compare(password , user.password) ;
     if(!hashpassword)
        throw new AuthError("email or password incorrecct");

    
    const token = jwt.sign({email:user.email , name:user.name ,id:user.id} , process.env.JWTSECRET! ,{expiresIn:"ihr"}); 

    res.status(200).send({
        message:"done" ,
        data:{
            user ,
            token
        }
    })

}