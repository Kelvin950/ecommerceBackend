import express from "express";
import {googleAuth} from '@controllers/userAuth'
const router  =  express.Router();

router.route("/userauth/googleOauth")
 .get(googleAuth);









export  {router as UserRoute};
