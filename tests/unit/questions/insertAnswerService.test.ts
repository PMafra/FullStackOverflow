import '../../../src/setup';
import { QueryResult } from 'pg';
import * as questionsService from '../../../src/services/questionsService';
import * as questionsRepository from '../../../src/repositories/questionsRepository';
import { Answer, generateRandomAnswer } from '../../factories/answerFactory';
import NotFoundError from '../../../src/errors/notFoundError';
import ConflictError from '../../../src/errors/conflictError';

const sut = questionsService;

const mockQueryResult: QueryResult = {
  rows: [],
  command: '',
  rowCount: 0,
  oid: 0,
  fields: [],
};

describe('Insert recommendation service tests', () => {
  it('Should throw NotFoundError for question id not found', async () => {
    jest.spyOn(questionsRepository, 'selectQuery').mockImplementationOnce(async () => false);

    const result = sut.insertAnswer(generateRandomAnswer());
    await expect(result).rejects.toThrowError(NotFoundError);
  });

  it('Should throw ConflictError for question already answered', async () => {
    const mockAnswered = { answered: true };
    jest.spyOn(questionsRepository, 'selectQuery').mockImplementationOnce(async () => mockAnswered);

    const result = sut.insertAnswer(generateRandomAnswer());
    await expect(result).rejects.toThrowError(ConflictError);
  });

  it('Should return answer for sucess answering question', async () => {
    const mockNotAnswered = { answered: false };
    const mockAnswerObject = generateRandomAnswer();
    jest.spyOn(questionsRepository, 'selectQuery').mockImplementationOnce(async () => mockNotAnswered);
    jest.spyOn(questionsRepository, 'insertNewAnswer').mockImplementationOnce(async () => mockQueryResult);
    jest.spyOn(questionsRepository, 'updateAnsweredState').mockImplementationOnce(async () => mockQueryResult);

    const result = await sut.insertAnswer(mockAnswerObject);
    expect(result).toEqual(mockAnswerObject.answer);
  });
});
