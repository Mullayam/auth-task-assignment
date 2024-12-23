import type { Request, Response } from "express";
import { IUser } from "@/utils/interfaces/user.interface";
import { basename } from "path";
import UserModel from "@/factory/models/user.model";

class MediaUploadController {
    async uploadMedia(req: Request, res: Response) {
        try {
            const user = req as IUser
            if (!req.file) {
                throw new Error("File is required")
            }
            const file = req.file as Express.Multer.File;

            const fileName = basename(file.filename)
              await UserModel.update({ avatar: fileName }, { where: { id: user.uid } })

            res.json({ message: "File uploaded successfully", result: null, success: true })
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