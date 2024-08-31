import Joi from 'joi';

export const reviewSchema = Joi.object({
  text: Joi.string().required().messages({
    'string.empty': 'Review text is required',
  }),
  rating: Joi.number().required().min(0).max(5).messages({
    'number.base': 'Rating must be a number',
    'number.min': 'Rating must be at least 0',
    'number.max': 'Rating cannot be more than 5',
    'any.required': 'Rating is required',
  }),
  user: Joi.string().required().messages({
    'string.empty': 'User ID is required',
    'any.required': 'User ID is required',
  }),
  product: Joi.string().required().messages({
    'string.empty': 'Product ID is required',
    'any.required': 'Product ID is required',
  }),
  likes: Joi.array().items(Joi.string()).optional(),
  report: Joi.string().optional().allow(''),
  version: Joi.number().default(1),
});
