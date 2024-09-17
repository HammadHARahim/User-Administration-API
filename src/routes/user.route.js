import express from "express";
import {
	createUser,
	deleteUser,
	getUser,
	updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/users/:id", getUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
