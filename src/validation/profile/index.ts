import Joi from 'joi';

const addressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string().required(),
  country: Joi.string().required(),
});

const preferencesSchema = Joi.object({
  language: Joi.string().default('en'),
  timezone: Joi.string().default('UTC'),
  notifications: Joi.object({
    email: Joi.boolean().default(true),
    sms: Joi.boolean().default(false),
    push: Joi.boolean().default(true),
  }),
});

export const profileSchema = Joi.object({
  user: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  profilePicture: Joi.string().optional(),
  bio: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  address: addressSchema.required(),
  preferences: preferencesSchema.optional(),
  version: Joi.number().default(1),
});
