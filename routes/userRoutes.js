import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/create", userController.createUser);
router.post("/login", userController.authenticate);
router.get("/", userController.findAllUsers);
router.get("/:id", userController.findUser);
router.get("/email/:id", userController.findUserByEmailId);
router.get("/:email/orders", userController.findOrders);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;