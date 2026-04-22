import { Router } from "express";
import { getUserById, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUserById);

userRouter.post("/", (req, res) => {
  res.send({ body: "Create User" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ body: `Update User with id ${req.params.id}` });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ body: `Delete User with id ${req.params.id}` });
});

export default userRouter;
