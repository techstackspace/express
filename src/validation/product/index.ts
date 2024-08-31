import Joi from 'joi';

export const productValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
  images: Joi.array().items(Joi.string().uri()).max(5),
  videos: Joi.array().items(Joi.string().uri()).max(3),
  pdfs: Joi.array().items(Joi.string().uri()),
  category: Joi.string().min(3).max(50).required(),
  tags: Joi.array().items(Joi.string().min(1)).required(),
  brand: Joi.string().min(2).max(50).required(),
  stock: Joi.number().min(0).required(),
  isPublished: Joi.boolean(),
  status: Joi.string().valid('draft', 'review', 'published').default('draft'),
  user: Joi.string().required(),
});
