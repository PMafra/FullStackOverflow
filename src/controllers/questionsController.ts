/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';

const addNewQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('oi');
    return res.sendStatus(200);
  } catch (error) {
    console.log('oi');
    return next();
  }
};

export {
  addNewQuestion,
};
