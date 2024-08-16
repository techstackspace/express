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
  reviews?: string[];
  tags: string[];
  brand: string;
  stock: number;
  likes: ObjectId[];
  comments: IComment;
  version: number;
}

export type { IProduct };
