import Joi from 'joi';

export const settingsSchema = Joi.object({
  theme: Joi.string()
    .valid('light', 'dark', 'system')
    .default('system')
    .messages({
      'string.empty': 'Theme cannot be empty',
      'any.only': 'Invalid theme value',
    }),
  profileVisibility: Joi.string()
    .valid('private', 'public')
    .default('private')
    .messages({
      'string.empty': 'Profile visibility cannot be empty',
      'any.only': 'Invalid profile visibility value',
    }),
  dataSharing: Joi.boolean().default(true).messages({
    'boolean.base': 'Data sharing must be a boolean value',
  }),
});
