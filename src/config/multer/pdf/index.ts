import multer, { StorageEngine } from 'multer';
import { Types } from 'mongoose';

const objectId = new Types.ObjectId();
const storage: StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/pdfs');
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${objectId}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const uploadPdf = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDFs are allowed') as unknown as null, false);
    }
  },
});

export default uploadPdf;
