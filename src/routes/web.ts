import { Router, Request, Response } from "express";
import { HttpException } from "@enjoys/exception"
import ApiRoutes from "./api";
import { __CONFIG__ } from "@/app/config";
import { JwtAuth } from '../middlewares/auth.Middleware';



const router = Router();

router.get(`/api/${__CONFIG__.APP.API_VERSION}/user`, JwtAuth.Me);
router.use(`/api/${__CONFIG__.APP.API_VERSION}`, JwtAuth.validateUser,ApiRoutes);
router.use("*", (req: Request, res: Response) => {
    throw new HttpException({ name: "NOT_FOUND", message: "Page Not Found", stack: { info: "Forbidden Resource", path: req.baseUrl, method: req.method } })
})


export default router