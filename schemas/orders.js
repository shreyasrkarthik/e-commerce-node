import mongoose from 'mongoose';

const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const order = new Schema({
    orderStatus: {
        type: String,
        enum: ['PROCESSING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED'],
    },
    orderDate: Date,
    quantity: Number,
    discount: Number,
    product: ObjectId,
    user: ObjectId
});

export default order;