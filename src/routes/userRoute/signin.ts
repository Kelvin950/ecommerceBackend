import express from "express";
import { login} from "@controllers/userAuth";
import isAuth from "@middleWares/ISAuth";
import { body } from "express-validator";
import Validation from "@middleWares/validationError";

const Router =  express.Router();

Router.route("/auth/login")
.post([ body("email").isEmail().notEmpty() , body("password").notEmpty().isLength({min:8}) ], Validation , login)

export default Router ;