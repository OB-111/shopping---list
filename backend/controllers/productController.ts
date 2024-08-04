import { Request, Response } from 'express';
import { Product } from '../models';

// Add or update products
export const addOrUpdateProducts = async (req: Request, res: Response) => {
    const products = req.body; // Ensure this is an array of products
    console.log('Received products:', products);
    try {
        for (const product of products) {
            const { name, category, quantity } = product;
            const existingProduct = await Product.findOne({ where: { name, category } });
            if (existingProduct) {
                existingProduct.quantity += quantity;
                await existingProduct.save();
            } else {
                await Product.create({ name, category, quantity });
            }
        }
        res.status(201).json({ message: 'Products added/updated successfully' });
    } catch (error) {
        console.error('Error saving products:', error); // Log error
        res.status(500).json({ error: 'Failed to add/update products' });
    }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
    const { name, category } = req.body;
    console.log('Deleting product:', name, category);
    try {
        const result = await Product.destroy({ where: { name, category } });
        if (result) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};


// Fetch saved products
export const getSavedProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch saved products' });
    }
};

