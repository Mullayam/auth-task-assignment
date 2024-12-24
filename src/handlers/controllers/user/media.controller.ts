import type { Request, Response } from "express";
import UserModel from "@/factory/models/user.model";
import { PublicRoute } from "@/utils/decorators";

class MediaUploadController {
    @PublicRoute()
    async uploadMedia(req: Request, res: Response) {
        try {

            if (!req.file) {
                throw new Error("File is required")
            }
            const uid = req.body.user_id as string
            
            const fileName = req.body.newNameOfFile
            await UserModel.update({ avatar: fileName }, { where: { id: parseInt(uid) } })
            res.json({ message: "Image uploaded successfully", result: null, success: true }).end()
        } catch (error: any) {
            if (error instanceof Error) {
                res.json({ message: error.message, result: null, success: false })
                return;
            }
            res.json({ message: "Something went wrong", result: null, success: false })
        }
    }
}
export default new MediaUploadController();