import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";


const authenticate = async (req, res, _next) => {
    const { email, password, userType } = req.body;

    const userTypes = {
        shopper: "SHOPPER",
        admin: "ADMIN",
        staff: "STAFF",
    };

    const user = await userModel.findByEmail(email);
    if (user) {
        if (password === user.password && userTypes[userType] === user.userType) {
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ success: false });
        }
    } else {
        res.json({ success: false, error: "User not found" });
    }
};

const createUser = async (req, res, _next) => {
    const user = req.body;
    const newUser = await userModel.create(user);
    res.status(200).json({ newUser });
};

const findAllUsers = async (_req, res, _next) => {
    const users = await userModel.findAll();
    if (users.length > 0) {
        res.json({ users });
    } else {
        res.json({ success: false, error: "Users not found" });
    }
};

const findUser = async (req, res, _next) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (user) {
        res.json({ user });
    } else {
        res.json({ success: false, error: "User not found" });
    }
};

const updateUser = async (req, res, _next) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (user) {
        const { user } = req.body;
        await userModel.update(id, user);
        const updatedUser = await userModel.findById(id);
        res.json({ updatedUser });
    } else {
        res.json({ success: false, error: "User not found" });
    }
};

const deleteUser = async (req, res, _next) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (user) {
        await userModel.deleteOne(id);
        res.json({ success: true });
    } else {
        res.json({ success: false, error: "User not found" });
    }
};

const findOrders = async (req, res, _next) => {
    const { email } = req.params;
    const user = await userModel.findByEmail(email);
    if (user) {
        const orders = await orderModel.findAll();
        const userOrders = orders.filter((order) => {
            return String(order.user) === String(user._id);
        });

        const products = await productModel.findAll();
        const productsMap = {};

        products.forEach(({ _id, name, price }) => {
            if (name) {
                productsMap[_id] = { name, price };
            }
        });

        const pastOrders = userOrders
            .filter((order) => productsMap[order._doc.product])
            .map((order) => {
                return {
                    ...order._doc,
                    productName: productsMap[order._doc.product].name,
                    total: order._doc.quantity * productsMap[order._doc.product].price,
                };
            });

        res.json({
            orders: pastOrders,
        });
    } else {
        res.json({ success: false, error: "User not found" });
    }
};

export default {
    authenticate,
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteUser,
    findOrders,
};