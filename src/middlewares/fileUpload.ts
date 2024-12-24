import multer from "multer";
import { join } from "path";
const UPLOAD_DIR = (...args: string[]) => join(process.cwd(), "uploads", ...args);

const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const ALLOWED_MAX_SIZE = 2 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR());
    },
    filename: function (req, file, cb) {
        const renameFile = `${Date.now()}-${file.originalname}`;
        req.body.newNameOfFile = renameFile;
        cb(null, renameFile);
    },
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: ALLOWED_MAX_SIZE },
    fileFilter: (req, file, cb) => {        
        if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only PNG, JPEG, and JPG are allowed.'));
        }
        cb(null, true);
    },
});