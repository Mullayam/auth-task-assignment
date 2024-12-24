import { Router } from "express";
import {  IntegrationController } from "@/handlers/controllers";

const router = Router();

router.get("/:provider", IntegrationController.default.providerAuth)
router.get("/:provider/callback", IntegrationController.default.providerCallback)
// router.post("/oauth2/webhook/:provider", IntegrationController.default.providerWebhook)

export default router