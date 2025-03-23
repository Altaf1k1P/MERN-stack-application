import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: './public',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only CSV allowed.'), false);
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
