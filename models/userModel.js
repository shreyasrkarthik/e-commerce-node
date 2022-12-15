import mongoose from 'mongoose';

import userSchema from '../schemas/users.js'

const User = mongoose.model('user', userSchema);

const create = async (newUser) => {
    return await new User(newUser).save();
}

const findAll = async () => {
    return await User.find();
}

const findById = async (id) => {
    return await User.findById(id);
}

const findByEmail = async (email) => {
    console.log("Model email", email);
    return User.findOne({email: email});
}

const update = async (id, updatedUser) => {
    await User.findOneAndUpdate({ _id: id }, updatedUser);
}

const deleteOne = async (id) => {
    await User.findOneAndDelete({ _id: id });
}

export default {
    create,
    findAll,
    findById,
    findByEmail,
    update,
    deleteOne,
};