import express from "express";
import controller from "../controllers/user";
import extractJWT from "../middleware/extractJWT";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/validate", extractJWT, (req: Request, res: Response, next: NextFunction) => {
  controller.validation(req, res, next);
});

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  controller.register(req, res, next);
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  controller.login(req, res, next);
});

router.get("/get/all", (req: Request, res: Response, next: NextFunction) => {
  controller.getAllUsers(req, res, next);
});

export default router;
