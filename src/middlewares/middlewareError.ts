/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable function-paren-newline */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import RequestError from '../errors/requestError';
import NotFoundError from '../errors/notFoundError';
import ConflictError from '../errors/conflictError';
import { httpStatusCode } from '../enums/httpStatus';

const middlewareError = async (
  err: any, req: Request, res: Response, next: NextFunction,
) => {
  if (err instanceof RequestError) {
    return res.sendStatus(httpStatusCode.BAD_REQUEST);
  }
  if (err instanceof NotFoundError) {
    return res.sendStatus(httpStatusCode.NOT_FOUND);
  }
  if (err instanceof ConflictError) {
    return res.sendStatus(httpStatusCode.CONFLICT);
  }
  const logErrorMessage = `method=${req.method} - url=${req.originalUrl} - ip=${req.ip} - message=${err.message} - status=500`;
  logger.error(logErrorMessage);
  return res.sendStatus(httpStatusCode.SERVER_ERROR);
};

export default middlewareError;
