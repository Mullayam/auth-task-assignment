import { Router } from "express";
import { MediaUploadController, UserAuthController } from "@/handlers/controllers";
import { upload } from "@/middlewares/fileUpload";
import { Validator } from "@/middlewares/validator.middleware";
import { UserReqValidator } from "@/utils/validators/Request.validator";
import AdminRoutes from "./admin.routes";
import IntegrationRoutes from "./integration.routes";
const router = Router();

router.post("/login", Validator.forFeature(UserReqValidator.Login), UserAuthController.default.Login)
router.get("/logout", UserAuthController.default.Logout)
router.post("/register", upload.single('file'), Validator.forFeature(UserReqValidator.Register), UserAuthController.default.Register)
router.get("/refresh-token", UserAuthController.default.RefereshToken)
router.post("/send-reset-password-instructions", Validator.forFeature(UserReqValidator.SendInstructions), UserAuthController.default.SendResetPasswordInstructions)
router.post("/reset-password", Validator.forFeature(UserReqValidator.ResetPassword), UserAuthController.default.ResetPassword)
router.get("/verify-email", Validator.forFeature(UserReqValidator.VerifyEmail), UserAuthController.default.VerifyEmail)
router.post("/resend-email", UserAuthController.default.ResendEmail)
router.get("/check-token", UserAuthController.default.IsTokenExist)
router.get("/current-user", UserAuthController.default.CurrentUser)
router.post("/upload-avatar", MediaUploadController.default.uploadMedia)


router.use("/admin", AdminRoutes)
router.use("/oauth2", IntegrationRoutes)

export default router