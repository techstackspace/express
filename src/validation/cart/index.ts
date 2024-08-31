import Joi from 'joi';

const addToCartSchema = Joi.object({
  product: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  user: Joi.string().required(),
});

const getCartItemsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  sort: Joi.string().default('createdAt'),
  order: Joi.string().valid('asc', 'desc').default('desc'),
  search: Joi.string().optional(),
  minQuantity: Joi.number().integer().min(0).optional(),
  maxQuantity: Joi.number().integer().min(0).optional(),
  productCategory: Joi.string().optional(),
});

const deleteFromCartSchema = Joi.object({
  user: Joi.string().required(),
});

export { addToCartSchema, getCartItemsSchema, deleteFromCartSchema };
