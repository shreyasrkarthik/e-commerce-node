import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const createOrder = async (req, res, _next) => {
    const { order } = req.body;
    const newOrder = await orderModel.create(order);
    res.json({ newOrder });
};

const findAllOrders = async (_req, res, _next) => {
    const orders = await orderModel.findAll();
    if (orders.length > 0) {
        res.json({ orders });
    } else {
        res.json({ success: false, error: "Orders not found" });
    }
};

const findOrder = async (req, res, _next) => {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (order) {
        res.json({ order });
    } else {
        res.json({ success: false, error: "Order not found" });
    }
};

const updateOrder = async (req, res, _next) => {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (order) {
        const { order } = req.body;
        await orderModel.update(id, order);
        const updatedOrder = await orderModel.findById(id);
        res.json({ updatedOrder });
    } else {
        res.json({ success: false, error: "Order not found" });
    }
};

const deleteOrder = async (req, res, _next) => {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (order) {
        await orderModel.deleteOne(id);
        res.json({ success: true });
    } else {
        res.json({ success: false, error: "Order not found" });
    }
};

const createBulkOrder = async (req, res, _next) => {
    const { products, email, discount } = req.body;
    const user = await userModel.findByEmail(email);
    const orders = products.map((product) => ({
        product,
        user: user._id,
        discount,
        quantity: 1,
        orderedDate: new Date(),
        orderStatus: "PROCESSING",
    }));

    const promises = orders.map(
        (order) =>
            new Promise((res, _rej) => {
                res(orderModel.create(order));
            })
    );

    const newOrders = await Promise.all(promises);

    res.json({ orders: newOrders });
};

export default {
    createOrder,
    findAllOrders,
    findOrder,
    updateOrder,
    deleteOrder,
    createBulkOrder,
};