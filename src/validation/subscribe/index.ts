import Joi from 'joi';

export const subscriptionSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required',
  }),
  version: Joi.number().default(1).optional(),
});
