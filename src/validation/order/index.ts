import Joi from 'joi';

export const createOrderSchema = Joi.object({
  user: Joi.string().required(),
  shippingAddress: Joi.string().optional(),
  paymentMethod: Joi.string()
    .valid('credit_card', 'paypal', 'bank_transfer')
    .required(),
});

export const updateOrderStatusSchema = Joi.object({
  orderStatus: Joi.string()
    .valid('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled')
    .optional(),
  isPaid: Joi.boolean().optional(),
  deliveredAt: Joi.date().optional(),
});
