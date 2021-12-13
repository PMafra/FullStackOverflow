import '../../../src/setup';
import * as questionsService from '../../../src/services/questionsService';
import * as questionsRepository from '../../../src/repositories/questionsRepository';
import { generateRandomAnswer } from '../../factories/answerFactory';
import NotFoundError from '../../../src/errors/notFoundError';

const sut = questionsService;

describe('Insert recommendation service tests', () => {
  it('Should throw notFoundError for question id not found', async () => {
    jest.spyOn(questionsRepository, 'selectQuery').mockImplementationOnce(async () => false);

    const result = sut.insertAnswer(generateRandomAnswer());
    await expect(result).rejects.toThrowError(NotFoundError);
  });
});
