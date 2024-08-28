import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../cloudinary';

interface ITransformation {
  width: number;
  height: number;
  crop: string;
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pictures',
    allowed_formats: ['jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  } as {
    folder: string;
    allowed_formats: string[];
    transformation: ITransformation[];
  },
});

const upload = multer({ storage: storage });

export default upload;
