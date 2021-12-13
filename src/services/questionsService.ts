/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import {
  Question, QuestionDB, FormattedQuestion, FormattedAnsweredQuestion,
} from '../interfaces/question';
import * as questionsRepository from '../repositories/questionsRepository';
import ConflictError from '../errors/conflictError';
import NotFoundError from '../errors/notFoundError';
import { Answer } from '../interfaces/answer';

const formatTimestamp = ({ info }: {info: string}): string => {
  const newTimestamp = new Date(info).toLocaleString();
  return newTimestamp;
};

const insertQuestion = async ({
  question, student, group, tags,
}: Question): Promise<number> => {
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

const selectQuestions = async (): Promise<QuestionDB[]> => {
  const notAnsweredQuestions = await questionsRepository.selectQuery({ getAllNotAnswered: true });
  notAnsweredQuestions.forEach((question: any) => {
    const newTimeStamp = formatTimestamp({ info: question.submitAt });
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

const formatQuestion = ({
  isAnswered, question,
}: {isAnswered: boolean, question: any}): FormattedQuestion|FormattedAnsweredQuestion => {
  const newSubmitAt = formatTimestamp({ info: question.submitAt });
  question.submitAt = newSubmitAt;
  delete question.id;
  if (isAnswered) {
    delete question.question_id;
    const newAnsweredAt = formatTimestamp({ info: question.answeredAt });
    question.answeredAt = newAnsweredAt;
    question.answeredBy = question.name;
    delete question.name;
  }
  return question;
};

const selectQuestionById = async ({ questionId }: {questionId: number}) => {
  const question = await questionsRepository.selectQuery({ id: questionId });

  if (!question) {
    throw new NotFoundError();
  }

  if (!question.answered) {
    const formattedQuestion = formatQuestion({ isAnswered: false, question });
    return formattedQuestion;
  }

  const answeredQuestion = await questionsRepository.selectAnsweredQuestionById(
    questionId,
  );

  const formattedAnsweredQuestion = formatQuestion({
    isAnswered: true, question: answeredQuestion,
  });
  return formattedAnsweredQuestion;
};

export {
  insertQuestion,
  selectQuestions,
  insertAnswer,
  selectQuestionById,
};
