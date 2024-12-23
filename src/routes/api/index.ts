import { Router } from "express";
import { MediaUploadController, UserAuthController } from "@/handlers/controllers";
import { upload } from "@/middlewares/fileUpload";
import { Validator } from "@/middlewares/validator.middleware";
import { UserReqValidator } from "@/utils/validators/Request.validator";
import AdminRoutes from "./admin.routes";
const router = Router();

router.post("/login", Validator.forFeature(UserReqValidator.Login), UserAuthController.default.Login)
router.get("/logout", UserAuthController.default.Logout)
router.post("/register", Validator.forFeature(UserReqValidator.Register), UserAuthController.default.Register)
router.get("/refresh-token", UserAuthController.default.RefereshToken)
router.post("/send-reset-password-instructions", Validator.forFeature(UserReqValidator.SendInstructions), UserAuthController.default.SendResetPasswordInstructions)
router.post("/reset-password", Validator.forFeature(UserReqValidator.ResetPassword),UserAuthController.default.ResetPassword)
router.post("/verify-email",  Validator.forFeature(UserReqValidator.VerifyEmail),UserAuthController.default.VerifyEmail)
router.get("/current-user", UserAuthController.default.CurrentUser)
router.post("/upload-avatar", upload.single('file'), MediaUploadController.default.uploadMedia)


router.use("/admin", AdminRoutes)

export default router