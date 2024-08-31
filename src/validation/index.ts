import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// export const validateRequest = (schema: Joi.Schema) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }
//     next();
//   };
// };
// export const validateRequest = (
//   schema: Joi.Schema,
//   source: 'body' | 'query' | 'params' = 'body'
// ) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const { error } = schema.validate(req[source]);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }
//     next();
//   };
// };

export const validateRequest = (
  schema: Joi.Schema,
  source: 'body' | 'query' | 'params' = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[source], { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors });
    }
    next();
  };
};
