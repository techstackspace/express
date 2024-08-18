import { ObjectId } from 'mongoose';
import { IComment } from '../comment/interface';

interface IProduct {
  name: string;
  description: string;
  price: number;
  images?: string[];
  videos?: string[];
  pdfs?: string[];
  category: string;
  rating?: number;
  reviews?: ObjectId[];
  tags: string[];
  brand: string;
  stock: number;
  likes: ObjectId[];
  comments: IComment[];
  version: number;
  calculateAverageRating(): Promise<void>;
}

export type { IProduct };
