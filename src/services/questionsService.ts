/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { QuestionInfo, QuestionInfoDB } from '../interfaces/questionInfo';
import * as questionsRepository from '../repositories/questionsRepository';
import ConflictError from '../errors/conflictError';
import NotFoundError from '../errors/notFoundError';
import { Answer } from '../interfaces/answer';

const formatTimestamp = (info: string) => {
  const newTimestamp = new Date(info).toLocaleString();
  return newTimestamp;
};

const insertQuestion = async ({
  question, student, group, tags,
}: QuestionInfo): Promise<number> => {
  const isAlreadyAsked = await questionsRepository.selectQuery({
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

const selectQuestions = async (): Promise<QuestionInfoDB[]> => {
  const notAnsweredQuestions = await questionsRepository.selectQuery({ getAllNotAnswered: true });
  notAnsweredQuestions.forEach((question: any) => {
    const newTimeStamp = formatTimestamp(question.submitAt);
    question.submitAt = newTimeStamp;
    delete question.tags;
    delete question.answered;
  });

  return notAnsweredQuestions;
};

const insertAnswer = async ({
  questionId, answer, user,
}: Answer): Promise<string> => {
  const questionToBeAnswered = await questionsRepository.selectQuery({ id: questionId });

  if (!questionToBeAnswered) {
    throw new NotFoundError();
  }

  if (questionToBeAnswered.answered) {
    throw new ConflictError();
  }

  await questionsRepository.insertNewAnswer({ questionId, answer, userId: user.id });
  await questionsRepository.updateAnsweredState(questionId);

  return answer;
};

const formatQuestion = ({ isAnswered, question }: {isAnswered: boolean, question: any}) => {
  const newSubmitAt = formatTimestamp(question.submitAt);
  question.submitAt = newSubmitAt;
  delete question.id;
  if (isAnswered) {
    delete question.question_id;
    const newAnsweredAt = formatTimestamp(question.answeredAt);
    question.answeredAt = newAnsweredAt;
    question.answeredBy = question.name;
    delete question.name;
  }
  return question;
};

const selectQuestionById = async (questionId: number) => {
  const question = await questionsRepository.selectQuery({ id: questionId });

  if (!question) {
    throw new NotFoundError();
  }

  if (!question.answered) {
    const formatedQuestion = formatQuestion({ isAnswered: false, question });
    return formatedQuestion;
  }

  const answeredQuestion = await questionsRepository.selectAnsweredQuestionById(
    questionId,
  );

  const formatedAnsweredQuestion = formatQuestion({ isAnswered: true, question: answeredQuestion });
  return formatedAnsweredQuestion;
};

export {
  insertQuestion,
  selectQuestions,
  insertAnswer,
  selectQuestionById,
  formatTimestamp,
};
