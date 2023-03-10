import  express from 'express' ;
import {createProduct ,deleteProduct ,deleteProducts , updateProduct ,getProduct ,getProducts} from '@controllers/productController' ;
import  validationError from '@middleWares/validationError'
import {body} from 'express-validator';
import isAuth from '@middleWares/ISAuth'
const router =  express.Router() ;

router.route("/product")
.post( [body("title").notEmpty().
trim() , body("price").notEmpty().isNumeric().trim() , body("description").notEmpty().isLength({min:15}) , body("image").notEmpty()] , validationError,isAuth.isAuth ,createProduct)
.delete(deleteProducts)
.get(getProducts)


router.route("/product/:id")
.put( [body("title").notEmpty().isAlphanumeric().trim() , body("price").notEmpty().isNumeric().trim() , body("description").notEmpty().isAlphanumeric().isLength({min:15}) , body("image").notEmpty()] , validationError , updateProduct)
.delete(deleteProduct)
.get(getProduct)
         

export {router as productRoute};
