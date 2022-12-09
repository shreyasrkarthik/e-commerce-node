import mongoose from 'mongoose';

const { Schema } = mongoose;

import address from './addresses.js';

let user = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    addresses: [address],
    password: String,
    userType: {
        type: String,
        enum: ['ADMIN', 'SHOPPER', 'STAFF']
    }
});

export default user;