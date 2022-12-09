import mongoose from 'mongoose';

import orderSchema from '../schemas/orders.js';

const Order = mongoose.model('order', orderSchema);

const create = async (newOrder) => {
    return await new Order(newOrder).save();
}

const findAll = async () => {
    return await Order.find();
}

const findById = async (id) => {
    return await Order.findById(id);
}

const update = async (id, updatedOrder) => {
    await Order.findOneAndUpdate({ _id: id }, updatedOrder);
}

const deleteOne = async (id) => {
    await Order.findOneAndDelete({ _id: id });
}

export default {
    create,
    findAll,
    findById,
    update,
    deleteOne,
};