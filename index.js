import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

// routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

dotenv.config();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }).then(() => {
    console.log("Connected to DB", process.env.DB_URI);
});

const corsOptions = {
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/product/", productRoutes);
app.use("/user/", userRoutes);
app.use("/order/", orderRoutes);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});

export default app;