import mongoose from 'mongoose';

const { Schema } = mongoose;

const seller = new Schema({
    companyName: String,
    address: String,
    ratings: Number,
    establishedYear: Number,
});

export default seller;