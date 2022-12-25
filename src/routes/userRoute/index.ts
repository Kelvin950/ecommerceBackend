import express from "express";
import signinRoute from './signin';
import {UserRoute} from './signup'
const Router =  express.Router();


Router.use(signinRoute);
Router.use(UserRoute);


export  default Router;