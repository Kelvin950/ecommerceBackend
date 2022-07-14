import jwt from 'jsonwebtoken'
interface Payload{
    userID:string  ,
    email:string

}
export default {

    createRefreshToken(payload:Payload){
        
         return jwt.sign(payload ,process.env.REFRESHKEY! , {expiresIn:"7d"} );
    } ,

    createAccessToken(payload:Payload){
        return jwt.sign(payload , process.env.ACCESSKEY! , {expiresIn:"15m"})
    } , 

}