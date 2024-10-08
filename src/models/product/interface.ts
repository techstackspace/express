import { Document, ObjectId } from 'mongoose';
import { IComment } from '../comment/interface';

interface IProduct extends Document {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images?: string[];
  videos?: string[];
  pdfs?: string[];
  pdfContents?: string[];
  category: string;
  rating?: number;
  reviews?: ObjectId[];
  tags: string[];
  brand: string;
  stock: number;
  likes: ObjectId[];
  comments: IComment[];
  isPublished: boolean;
  slug: string;
  status: 'draft' | 'review' | 'published';
  version: number;
  user: ObjectId;
  calculateAverageRating(): Promise<void>;
}

export type { IProduct };
