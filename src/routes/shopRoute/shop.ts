import express, { Router } from 'express';
import {body} from 'express-validator';
import Validation from '@middleWares/validationError';
import ISAuth from '@middleWares/ISAuth';
import {createShop ,requestForShop , viewShop ,viewShopById} from '@controllers/shopController'
import { emailLimiter } from "@utils/limiter";
const router=  Router(); 

router.route("/shop/createshop")
.post([body("name").isAlpha().notEmpty() , body("address").notEmpty()] , Validation , ISAuth.isAuth ,createShop ) 


router.route("/shop/request")
.get( emailLimiter,ISAuth.isAuth , requestForShop);

router.route("/shop/myshop")
.get(ISAuth.isAuth , viewShop)

router.route("/shop/:shopId")
.get(viewShopById)
export default router;