import express from "express";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.post("/", orderController.createOrder);
router.post("/bulk", orderController.createBulkOrder);
router.get("/", orderController.findAllOrders);
router.get("/:id", orderController.findOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

export default router;