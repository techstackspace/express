import Joi from 'joi';

export const productValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).default(0).required(),
  images: Joi.array().items(Joi.string().uri()).max(5),
  videos: Joi.array().items(Joi.string().uri()).max(3),
  pdfs: Joi.array().items(Joi.string().uri()).optional(),
  pdfContents: Joi.array().items(Joi.string().uri()).optional(),
  category: Joi.string().min(3).max(50).required(),
  rating: Joi.number().min(0).max(5).optional(),
  reviews: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  tags: Joi.array().items(Joi.string().min(1)).required(),
  brand: Joi.string().min(2).max(50).required(),
  stock: Joi.number().min(0).required(),
  likes: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  comments: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  isPublished: Joi.boolean().optional(),
  status: Joi.string()
    .valid('draft', 'review', 'published')
    .default('draft')
    .optional(),
  user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});
