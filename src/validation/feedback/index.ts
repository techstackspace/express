import Joi from 'joi';

const feedbackSchema = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
  orderId: Joi.string().optional(),
  rating: Joi.number().min(1).max(5).required(),
  feedbackType: Joi.string().valid('product', 'service', 'delivery').required(),
  title: Joi.string().optional(),
  comments: Joi.string().optional(),
  suggestions: Joi.string().optional(),
  dateSubmitted: Joi.date().optional(),
  images: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required(),
        description: Joi.string().optional(),
      })
    )
    .optional(),
  contactPermission: Joi.boolean().optional(),
  appVersion: Joi.string().default('1.3.0'),
  platform: Joi.string().valid('mobile', 'tablet', 'desktop', 'web').required(),
  browserInfo: Joi.string().required(),
});

export { feedbackSchema };
