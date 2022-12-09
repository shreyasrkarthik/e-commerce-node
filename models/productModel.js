import mongoose from 'mongoose';
import productSchema from '../schemas/products.js';

const Product = mongoose.model('product', productSchema);

const create = async (newProduct) => {
    return await new Product(newProduct).save();
}

const findAll = async () => {
    return await Product.find();
}

const findById = async (id) => {
    return await Product.findById(id);
}

const update = async (id, updatedProduct) => {
    await Product.findOneAndUpdate({ _id: id }, updatedProduct);
}

const deleteOne = async (id) => {
    await Product.findOneAndDelete({ _id: id });
}

export default {
    create,
    findAll,
    findById,
    update,
    deleteOne,
};