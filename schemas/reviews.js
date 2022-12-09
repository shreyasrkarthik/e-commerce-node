import mongoose from 'mongoose';

const { Schema } = mongoose;

const review = new Schema({
    content: String,
    created: Date,
    updated: Date
});

export default review;