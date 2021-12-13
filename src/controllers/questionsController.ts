/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';
import * as questionsService from '../services/questionsService';
import { logger } from '../utils/logger';

const addNewQuestion = async (req: Request, res: Response, next: NextFunction) => {
  const {
    question,
    student,
    group,
    tags,
  } = req.body;

  try {
    const newQuestion = await questionsService.insertQuestion({
      question, student, group, tags,
    });
    return res.send(newQuestion);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const obtainQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questions = await questionsService.selectQuestions();
    return res.send(questions);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const answerQuestion = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = res.locals;
  const { answer } = req.body;
  const { id } = req.params;
  const questionId = Number(id);
  try {
    const newAnswer = await questionsService.insertAnswer({
      questionId, answer, user,
    });

    return res.send({ answer: newAnswer });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const obtainQuestionById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const questionId = Number(id);

  try {
    const question = await questionsService.selectQuestionById(questionId);
    return res.send(question);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

export {
  addNewQuestion,
  obtainQuestions,
  answerQuestion,
  obtainQuestionById,
};
