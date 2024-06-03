import Express from "express";
import userFunction from "../functions/userFunction.js";

const router = Express.Router();

router.post('/login', userFunction.login);

router.post('/register', userFunction.register);

export default router;

