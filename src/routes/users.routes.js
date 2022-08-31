import express from "express";
import { login, logout, register } from "../controllers/auth.controller";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.controller";

const router = express.Router();

//Authentication
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

//User
router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
