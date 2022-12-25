import express from "express";
import {googleAuth} from '@controllers/userAuth'
import isAuth from '@middleWares/ISAuth'
const router  =  express.Router();

router.route("/userauth/googleOauth")
 .get(googleAuth);


router.route("/auth/simpleAuth")
.post(isAuth.isAuth, )








export  {router as UserRoute};
