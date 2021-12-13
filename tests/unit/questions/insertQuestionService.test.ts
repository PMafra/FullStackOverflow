import '../../../src/setup';
import * as questionsService from '../../../src/services/questionsService';
import * as questionsRepository from '../../../src/repositories/questionsRepository';
import { generateRandomQuestion } from '../../factories/questionFactory';
import ConflictError from '../../../src/errors/conflictError';

const sut = questionsService;

describe('Insert recommendation service tests', () => {
  it('Should throw conflictError for question already asked', async () => {
    jest.spyOn(questionsRepository, 'selectQuery').mockImplementationOnce(async () => true);

    const result = sut.insertQuestion(generateRandomQuestion());
    await expect(result).rejects.toThrowError(ConflictError);
  });

  it('Should return new question id for new question added', async () => {
    jest.spyOn(questionsRepository, 'selectQuery').mockImplementationOnce(async () => false);

    const result = await sut.insertQuestion(generateRandomQuestion());
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
      }),
    );
  });
});
