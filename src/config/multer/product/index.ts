import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../cloudinary';
import { Request } from 'express';

interface CloudinaryParams {
  folder: string;
  resource_type: string;
  format: () => Promise<string>;
  public_id: (_req: Request, file: Express.Multer.File) => string;
}

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
      return `${Date.now()}-${file.originalname}`;
    },
  } as unknown as CloudinaryParams,
});

export const uploadMedia = multer({ storage });
