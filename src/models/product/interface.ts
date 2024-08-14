import { IComment } from '../comment/interface';
import { IUser } from '../user/interface';

interface IProduct {
  name: string;
  description: string;
  price: number;
  image?: string[];
  video?: string[];
  pdf?: string[];
  category: string;
  rating?: number;
  reviews?: string;
  tags: string[];
  brand: string;
  stock: number;
  likes: IUser;
  comments: IComment;
  version: string;
}

export type { IProduct };
