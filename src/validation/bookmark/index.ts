import Joi from 'joi';

const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const addBookmarkSchema = Joi.object({
  user: objectId.required(),
  product: objectId.required(),
});

const removeBookmarkSchema = Joi.object({
  user: objectId.required(),
  id: objectId.required(),
});

const getBookmarksSchema = Joi.object({
  user: objectId.required(),
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
