import Joi from 'joi';

export const createOrderSchema = Joi.object({
  user: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().integer().min(1).default(1),
        price: Joi.number().required(),
      })
    )
    .required(),
  shippingAddress: Joi.string().required(),
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
