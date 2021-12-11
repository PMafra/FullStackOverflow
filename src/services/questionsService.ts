import { QuestionInfo } from '../interfaces/questionInfo';
import * as questionsRepository from '../repositories/questionsRepository';
import ConflictError from '../errors/conflictError';

const insertQuestion = async ({
  question, student, group, tags,
}: QuestionInfo): Promise<number> => {
  const isAlreadyAsked = await questionsRepository.selectQuestion({
    question, student, group,
  });

  if (isAlreadyAsked) {
    throw new ConflictError();
  }

  const newQuestion = await questionsRepository.insertQuestion({
    question, student, group, tags,
  });

  return newQuestion;
};

export {
  insertQuestion,
};
