interface IFeedback {
  userId: string;
  productId: string;
  orderId?: string;
  rating: number;
  feedbackType: 'product' | 'service' | 'delivery';
  title?: string;
  comments?: string;
  suggestions?: string;
  dateSubmitted?: Date;
  images?: Array<{
    url: string;
    description: string;
  }>;
  contactPermission?: boolean;
  platform: string;
  appVersion: string;
  browserInfo: string;
  version: number;
}

export type { IFeedback };
