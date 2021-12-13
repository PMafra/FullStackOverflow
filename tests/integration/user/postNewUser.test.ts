import '../../../src/setup';
import supertest from 'supertest';
import clearDatabase from '../../helpers/clearDatabase';
import app from '../../../src/app';
import connection from '../../../src/database/database';
import { insertUser, User, generateRandomUser } from '../../factories/userFactory';

const agent = supertest(app);

beforeEach(async () => {
  await clearDatabase();
});
afterAll(() => {
  connection.end();
});

describe('POST /users', () => {
  it('should return new user token for new user registered', async () => {
    const result = await agent
      .post('/users')
      .send(generateRandomUser());
    expect(result.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });

  it('should return status 400 for wrong body', async () => {
    const result = await agent
      .post('/users')
      .send({ wrongBody: true });
    expect(result.status).toEqual(400);
  });

  it('should return status 409 for already existing user', async () => {
    const mockUser = new User('Pedro', 'T3', 'token');
    await insertUser(mockUser);

    const result = await agent
      .post('/users')
      .send({ name: 'Pedro', group: 'T3' });
    expect(result.status).toEqual(409);
  });
});
