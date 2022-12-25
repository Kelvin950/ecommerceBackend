import {Request , Response}  from 'express' ;
import  Product from '@models/Products';
import BadRequestError from '@errors/BadRequestError'
const createProduct = async  (req:Request , res:Response)=>{

 
   const product =  await  Product.create(req.body);

    return res.status(201).send(product);
       

}

const getProducts =  async(req:Request , res:Response)=>{

    const products =  await Product.find();
 
    return res.status(200).send(products);

}

const getProduct = async(req:Request,res:Response)=>{

    const product = await Product.findById(req.params.id);
    if(!product){
        throw new BadRequestError("product not found");
    }

    res.status(200).send(product)

}
const deleteProducts =  async (req:Request , res:Response)=>{
    
    
    await Product.deleteMany({});

    res.status(200).send({message:"Deleted all"});

 
}


const updateProduct =  async(req:Request ,res:Response)=>{

const {id} =  req.params ;
const  { title,
    price,
    description ,
    image} =  req.body ; 
const product = await  Product.findById(id) ;

if(!product){
    throw new Error("product not found");
}

product.price = price;
product.title =  title ;
product.description =  description;
product.image= image ;

await product.save(); 


res.status(200).send(product);
}

const deleteProduct =  async (req:Request , res:Response)=>{

  const product  =  await Product.findById(req.params.id);

  if(!product){
  
    throw new BadRequestError("product not found");

  } 

  await  Product.deleteOne({_id:product._id});

  res.status(200).send({message:"deleted"});


}


export {createProduct , deleteProduct , updateProduct , deleteProducts , getProduct , getProducts };