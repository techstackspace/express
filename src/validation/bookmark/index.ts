import Joi from 'joi';

const addBookmarkSchema = Joi.object({
  user: Joi.string().required(),
  product: Joi.string().required(),
});

const removeBookmarkSchema = Joi.object({
  user: Joi.string().required(),
  id: Joi.string().required(),
});

const getBookmarksSchema = Joi.object({
  user: Joi.string().required(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  sort: Joi.string().default('createdAt'),
  order: Joi.string().valid('asc', 'desc').default('desc'),
  search: Joi.string().optional(),
  minDate: Joi.date().optional(),
  maxDate: Joi.date().optional(),
  productCategory: Joi.string().optional(),
});

export { addBookmarkSchema, removeBookmarkSchema, getBookmarksSchema };
