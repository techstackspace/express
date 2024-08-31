import Joi from 'joi';

export const searchSchema = Joi.object({
  search: Joi.string().required().messages({
    'string.empty': 'Search term is required',
    'any.required': 'Search term is required',
  }),
});
