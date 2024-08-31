import Joi from 'joi';
import { Types } from 'mongoose';

const idValidation = Joi.string().custom((value, helpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId Validation');

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  sort: Joi.string().valid('createdAt', 'updatedAt').default('createdAt'),
  order: Joi.string().valid('asc', 'desc').default('desc'),
});

const commentCreationSchema = Joi.object({
  user: idValidation.required(),
  product: idValidation.required(),
  content: Joi.string().required(),
});

const commentUpdateSchema = Joi.object({
  content: Joi.string().optional(),
  likes: Joi.array().items(idValidation).optional(),
});

const toggleLikeSchema = Joi.object({
  user: idValidation.required(),
});

const querySchema = paginationSchema.keys({
  search: Joi.string().optional(),
  minDate: Joi.date().optional(),
  maxDate: Joi.date().optional(),
  user: idValidation.optional(),
  product: idValidation.optional(),
  minLikes: Joi.number().integer().min(0).optional(),
  maxLikes: Joi.number().integer().min(0).optional(),
});

export {
  commentCreationSchema,
  commentUpdateSchema,
  toggleLikeSchema,
  querySchema,
};
