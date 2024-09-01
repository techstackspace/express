import Joi from 'joi';

const addressSchema = Joi.object({
  user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  addressLine1: Joi.string().required(),
  addressLine2: Joi.string().optional().allow(''),
  city: Joi.string().required(),
  state: Joi.string().required(),
  postalCode: Joi.string().required(),
  country: Joi.string().required(),
  isDefault: Joi.boolean().optional(),
});

const updateAddressSchema = Joi.object({
  addressLine1: Joi.string().optional(),
  addressLine2: Joi.string().optional().allow(''),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  postalCode: Joi.string().optional(),
  country: Joi.string().optional(),
  isDefault: Joi.boolean().optional(),
});

export { addressSchema, updateAddressSchema };
