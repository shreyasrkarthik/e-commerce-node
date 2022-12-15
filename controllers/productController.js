import productModel from "../models/productModel.js";

const createProduct = async (req, res, _next) => {
    console.log("Product being created", req.body);
    const product = req.body;
    const newProduct = await productModel.create(product);
    res.status(200).json({ newProduct });
};

const addReview = async (req, res, _next) => {
    const { review } = req.body;
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (product && review) {
        product.reviews.push(review);
        await productModel.update(id, product);
        const updatedProduct = await productModel.findById(id);
        res.json({ updatedProduct });
    } else {
        res.json({ success: false, error: "Product or review not found" });
    }
};
const findAllProducts = async (_req, res, _next) => {
    const products = await productModel.findAll();
    if (products.length > 0) {
        res.json({ products });
    } else {
        res.json({ success: false, error: "Products not found" });
    }
};

const findProduct = async (req, res, _next) => {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (product) {
        res.json({ product });
    } else {
        res.json({ success: false, error: "Product not found" });
    }
};

const updateProduct = async (req, res, _next) => {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (product) {
        const { product } = req.body;
        await productModel.update(id, product);
        const updatedProduct = await productModel.findById(id);
        res.json({ updatedProduct });
    } else {
        res.json({ success: false, error: "Product not found" });
    }
};

const deleteProduct = async (req, res, _next) => {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (product) {
        await productModel.deleteOne(id);
        res.json({ success: true });
    } else {
        res.json({ success: false, error: "Product not found" });
    }
};

export default {
    createProduct,
    addReview,
    findAllProducts,
    findProduct,
    updateProduct,
    deleteProduct,
};