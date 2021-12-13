import { Response, Request, NextFunction } from 'express';
import * as userService from '../services/userService';
import { logger } from '../utils/logger';
import { httpStatusCode } from '../enums/httpStatus';

async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.sendStatus(httpStatusCode.UNAUTHORIZED);

  try {
    const user = await userService.selectUserByToken(token);

    if (!user) {
      return res.sendStatus(httpStatusCode.UNAUTHORIZED);
    }
    res.locals.user = user;
  } catch (err) {
    logger.error(err);
    return res.sendStatus(httpStatusCode.UNAUTHORIZED);
  }
  return next();
}

export default auth;
