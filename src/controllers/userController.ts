/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { logger } from '../utils/logger';

const addNewUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    group,
  } = req.body;

  try {
    const token = await userService.insertUser({
      name, group,
    });
    return res.send(token).status(201);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

export {
  addNewUser,
};
