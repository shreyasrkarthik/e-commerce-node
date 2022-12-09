import mongoose from 'mongoose';
import review from './reviews.js';
import seller from './seller.js';

const { Schema } = mongoose;

const product = new Schema({
    name: String,
    description: String,
    price: Number,
    category: {
        type: String,
        enum: ['CLOTHES', 'ELECTRONICS', 'HOME_ESSENTIALS', 'HEALTH_AND_WELLNESS', 'CHILDREN', 'OTHERS']
    },
    image: String,
    quantity: Number,
    reviews: [review],
    sellers: [seller],
});

export default product;