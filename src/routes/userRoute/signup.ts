import express from "express";
import {googleAuth ,simpleAuth} from '@controllers/userAuth'
import isAuth from '@middleWares/ISAuth' ;
import {body}  from  'express-validator' ;
import Validation  from  '@middleWares/validationError'
const router  =  express.Router();

router.route("/userauth/googleOauth")
 .get(googleAuth);


router.route("/auth/simpleAuth" )
.post([body("name").isAlpha().notEmpty() , body("email").isEmail().notEmpty() , body("password").notEmpty().isLength({min:8}) ,body("address").notEmpty()]  ,
Validation, simpleAuth);








export  {router as UserRoute};
