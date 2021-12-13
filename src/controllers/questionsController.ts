/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';
import * as questionsService from '../services/questionsService';
import { logger } from '../utils/logger';
import * as validationService from '../services/validationService';
import { newQuestionSchema, answerSchema } from '../validations/joiSchemas';
import { QuestionInfo } from '../interfaces/questionInfo';

const addNewQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validationService.validateObjectWithJoi({ object: req.body, schema: newQuestionSchema });

    const {
      question,
      student,
      group,
      tags,
    }: QuestionInfo = req.body;

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
  try {
    await validationService.validateObjectWithJoi({ object: req.body, schema: answerSchema });

    const { answer }: { answer: string } = req.body;
    const { id } = req.params;
    const questionId = Number(id);

    if (!questionId) {
      return res.sendStatus(400);
    }

    const { user } = res.locals;

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

  if (!questionId) {
    return res.sendStatus(400);
  }

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
