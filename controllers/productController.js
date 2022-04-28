import mongoose from 'mongoose';

import Product from "../models/product.js";

export const createProduct = async (req, res) => {
    const product = req.body;

    const newProduct = new Product({ ...product, artisan: req.user.id, createdAt: new Date().toISOString() });

    try {
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getProductsByArtisan = async (req, res) => {
    const artisan = req.params;

    try {
        const products = await Product.find(artisan);

        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const likeProduct = async (req, res) => {
    const { id } = req.params;

    if(!req.user.id) return res.json({ message: 'Unauthenticated' });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No product with that id');

    const product = await Product.findById(id);

    const index = product.likes.findIndex((id) => id === String(req.user.id));

    if(index === -1) {
        product.likes.push(req.user.id);
    } else {
        product.likes = product.likes.filter((id) => id !== String(req.user.id));
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

    res.json(updatedProduct);
}

export const commentProduct = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const product = await Product.findById(id);

    product.comments.push(value);

    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

    res.json(updatedProduct);
}
