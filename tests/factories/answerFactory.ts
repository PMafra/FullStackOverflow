import faker from 'faker';
import connection from '../../src/database/database';
import { Answer as AnswerInterface } from '../../src/interfaces/answer';
import { UserDB } from '../../src/interfaces/user';

class Answer {
  questionId: number;

  answer: string;

  user: UserDB;

  constructor(questionId: number, answer: string, user: UserDB) {
    this.questionId = questionId;
    this.answer = answer;
    this.user = user;
  }
}

const generateRandomAnswer = () => ({
  questionId: faker.datatype.number(),
  answer: faker.random.words(),
  user: {
    id: faker.datatype.number(),
    name: faker.internet.userName(),
    group: faker.datatype.string(),
  },
});

const insertAnswer = async ({
  questionId, answer, userId,
}: AnswerInterface) => {
  await connection.query(
    'INSERT INTO "answered_questions" ("question_id", "answeredBy", answer) VALUES ($1, $2, $3)',
    [questionId, userId, answer],
  );
};

export {
  Answer,
  generateRandomAnswer,
  insertAnswer,
};
