/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { QuestionInfo, QuestionInfoDB } from '../interfaces/questionInfo';
import * as questionsRepository from '../repositories/questionsRepository';
import ConflictError from '../errors/conflictError';
import NotFoundError from '../errors/notFoundError';
import { Answer } from '../interfaces/answer';

const formatTimestamp = (info: any) => {
  const newTimestamp = new Date(info).toLocaleString();
  return newTimestamp;
};

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

const selectQuestions = async (): Promise<QuestionInfoDB[]> => {
  const notAnsweredQuestions = await questionsRepository.selectQuestions();
  notAnsweredQuestions.forEach((question) => {
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
  const questionToBeAnswered = await questionsRepository.selectQuestionById(questionId);

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

const selectQuestionById = async (questionId: number) => {
  const question = await questionsRepository.selectQuestionById(
    questionId,
  );

  if (!question) {
    throw new NotFoundError();
  }

  if (!question.answered) {
    const newTimeStamp = formatTimestamp(question.submitAt);
    question.submitAt = newTimeStamp;
    delete question.id;
    return question;
  }

  const answeredQuestion = await questionsRepository.selectAnsweredQuestionById(
    questionId,
  );

  delete answeredQuestion.question_id;
  delete answeredQuestion.id;
  const newTimestamp = formatTimestamp(answeredQuestion.submitAt);
  answeredQuestion.submitAt = newTimestamp;
  const newTimestamp2 = formatTimestamp(answeredQuestion.answeredAt);
  answeredQuestion.answeredAt = newTimestamp2;

  answeredQuestion.answeredBy = answeredQuestion.name;
  delete answeredQuestion.name;

  return answeredQuestion;
};

export {
  insertQuestion,
  selectQuestions,
  insertAnswer,
  selectQuestionById,
  formatTimestamp,
};
