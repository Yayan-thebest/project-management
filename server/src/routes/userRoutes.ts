import { Router } from "express";
import { getUser, getUsers, postUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);

// for aws cognito
router.post("/", postUser);
router.get("/:cognitoId", getUser);

export default router;