import mongoose from 'mongoose';

const { Schema } = mongoose;

const address = new Schema({
    country: String,
    state: String,
    city: String,
    street: String,
    zipcode: Number
});

export default address;