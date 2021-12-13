import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { logger } from '../utils/logger';
import { newUserSchema } from '../validations/joiSchemas';
import * as validationService from '../services/validationService';
import { User } from '../interfaces/user';

const addNewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validationService.validateObjectWithJoi({ object: req.body, schema: newUserSchema });

    const {
      name,
      group,
    }: User = req.body;

    const token = await userService.insertUser({
      name, group,
    });
    return res.send(token);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

export {
  addNewUser,
};
