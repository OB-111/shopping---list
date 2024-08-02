
import { Request, Response } from 'express';
import { Product } from '../models';


export const saveProdcuts = async(req:Request,res:Response) => {
    const {products} = req.body;
    console.log(products)
    // loop the products and check in the db if exist
    for(const product of products){
        const {name, category, quantity} = product;
        const exsitingProduct = await Product.findOne({where:{name,category}});

        if (exsitingProduct) {
            await exsitingProduct.update({quantity: exsitingProduct.quantity + 1})
        }else{
            await Product.create({name, category, quantity});
        }
    }

    res.status(200).send('Products saved successfully')
}