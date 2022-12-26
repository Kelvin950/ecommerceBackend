import express, { Router } from 'express';
import {body} from 'express-validator';
import Validation from '@middleWares/validationError';
import ISAuth from '@middleWares/ISAuth';
import {createShop ,requestForShop} from '@controllers/shopController'

const router=  Router(); 

router.route("/createshop")
.post([body("name").isAlpha().notEmpty() , body("address").notEmpty()] , Validation , ISAuth.isAuth ,createShop ) 


router.route("/request")
.get(ISAuth.isAuth ,requestForShop);

export default router;