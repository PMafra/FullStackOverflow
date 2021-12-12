import { Response, Request, NextFunction } from 'express';
import UnauthorizedError from '../errors/unauthorizedError';
import * as userService from '../services/userService';
import { logger } from '../utils/logger';

async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new UnauthorizedError();

  try {
    const user = await userService.selectUserByToken(token);

    if (!user) {
      throw new UnauthorizedError();
    }
    res.locals.user = user;
  } catch (err) {
    logger.error(err);
    throw new UnauthorizedError();
  }
  return next();
}

export default auth;
