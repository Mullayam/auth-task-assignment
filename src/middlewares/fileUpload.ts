import multer from "multer";
import { join } from "path";
const UPLOAD_DIR = (...args: string[]) => join(process.cwd(), "uploads", ...args);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const UPLOADING_PATH = UPLOAD_DIR(req.user!.name!)
        const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
        const ALLOWED_MAX_SIZE = 2;
        if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
            cb(Error('Invalid file'), UPLOADING_PATH);
        }
        if ((file.size / (1024 * 1024)) > ALLOWED_MAX_SIZE) {
            cb(Error('Invalid fileFile too large'), UPLOADING_PATH);
        }
        cb(null, UPLOADING_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const upload = multer({ storage: storage });