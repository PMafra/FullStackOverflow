import { QuestionInfo } from '../interfaces/questionInfo';
import * as questionsRepository from '../repositories/questionsRepository';

const insertQuestion = async ({
  question, student, group, tags,
}: QuestionInfo): Promise<number> => {
  const newQuestion = await questionsRepository.insertQuestion({
    question, student, group, tags,
  });

  return newQuestion;
};

export {
  insertQuestion,
};
