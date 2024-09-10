import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../cloudinary';
import { Request } from 'express';
import { Types } from 'mongoose';

interface CloudinaryParams {
  folder: string;
  resource_type: string;
  format: () => Promise<string>;
  public_id: (_req: Request, _file: Express.Multer.File) => string;
}

const objectId = new Types.ObjectId();
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    resource_type: 'auto',
    format: async (_req: Request, file: { mimetype: string }) => {
      if (file.mimetype.startsWith('image/')) return 'jpg';
      if (file.mimetype.startsWith('video/')) return 'mp4';
      return 'bin';
    },
    public_id: (_req: Request, file: Express.Multer.File) => {
      return `${Date.now()}-${objectId}-${file.originalname}`;
    },
  } as unknown as CloudinaryParams,
});

export const uploadMedia = multer({ storage });
