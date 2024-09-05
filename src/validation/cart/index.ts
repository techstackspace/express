import Joi from 'joi';

const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const addToCartSchema = Joi.object({
  product: objectId.required(),
  quantity: Joi.number().integer().min(1).required(),
  user: objectId.required(),
});

const getCartItemsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  sort: Joi.string().default('createdAt'),
  order: Joi.string().valid('asc', 'desc').default('desc'),
  search: Joi.string().optional(),
  minQuantity: Joi.number().integer().min(0).optional(),
  maxQuantity: Joi.number().integer().min(0).optional(),
  productCategory: objectId.optional(),
});

const deleteFromCartSchema = Joi.object({
  user: objectId.required(),
});

export { addToCartSchema, getCartItemsSchema, deleteFromCartSchema };
