import '../../../src/setup';
import supertest from 'supertest';
import clearDatabase from '../../helpers/clearDatabase';
import app from '../../../src/app';
import connection from '../../../src/database/database';
import { insertQuestion, generateRandomQuestion, Question } from '../../factories/questionFactory';

const agent = supertest(app);

beforeEach(async () => {
  await clearDatabase();
});
afterAll(() => {
  connection.end();
});

describe('POST /questions', () => {
  it('should return newQuestion id for new question added', async () => {
    const result = await agent
      .post('/questions')
      .send(generateRandomQuestion());
    expect(result.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
      }),
    );
  });

  it('should return status 400 for wrong body', async () => {
    const result = await agent
      .post('/questions')
      .send({ wrongBody: true });
    expect(result.status).toEqual(400);
  });

  it('should return status 409 for already existing question', async () => {
    const mockQuestion = new Question('someQuestion', 'someStudent', 'someGroup', 'someTags');
    await insertQuestion(mockQuestion);

    const result = await agent
      .post('/questions')
      .send(mockQuestion);
    expect(result.status).toEqual(409);
  });
});
