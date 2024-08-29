import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../cloudinary';

interface CloudinaryParams {
  folder: string;
  format: () => Promise<string>;
  transformation?: { width: number; height: number; crop: string }[];
}

const getFormat = async (_req: Express.Request, file: Express.Multer.File): Promise<string> => {
  const mimeType = file.mimetype;
  switch (mimeType) {
    case 'image/jpeg':
    case 'image/jpg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/avif':
      return 'avif';
    default:
      throw new Error('Unsupported image format');
  }
};

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profiles',
    format: getFormat,
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  } as CloudinaryParams,
});

export const uploadImage = multer({ storage: imageStorage });
