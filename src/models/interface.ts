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
  likes: string[];
  comments: string[];
}

export type { IProduct };
