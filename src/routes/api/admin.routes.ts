import { Router } from "express";
import { AdminController } from "@/handlers/controllers";
import { Validator } from "@/middlewares/validator.middleware";
import { AdminReqValidator } from "@/utils/validators/Request.validator";

const router = Router();

router.get("/get-all-users", Validator.forFeature(AdminReqValidator.GetAllUsers), AdminController.default.getAllUsers)
router.get("/search-in-all-users", Validator.forFeature(AdminReqValidator.SearchQuery), AdminController.default.getAllUsers)
router.get("/get-single-user/:user_id",Validator.forFeature(AdminReqValidator.UserIdParam), AdminController.default.getAllUsers)
router.patch("/update-user/:user_id", Validator.forFeature(AdminReqValidator.UserIdParam),AdminController.default.updateUser)
router.delete("/delete-user/:user_id",Validator.forFeature(AdminReqValidator.UserIdParam), AdminController.default.deleteUser)




export default router