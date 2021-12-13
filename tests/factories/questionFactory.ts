import faker from 'faker';
import connection from '../../src/database/database';
import { Question as QuestionInterface } from '../../src/interfaces/question';

class Question {
  question: string;

  student: string;

  group: string;

  tags: string;

  constructor(question: string, student: string, group: string, tags: string) {
    this.question = question;
    this.student = student;
    this.group = group;
    this.tags = tags;
  }
}

const generateRandomQuestion = () => ({
  question: faker.datatype.string(),
  student: faker.datatype.string(),
  group: faker.datatype.string(),
  tags: faker.datatype.string(),
});

const insertQuestion = async ({
  question, student, group, tags,
}: QuestionInterface) => {
  await connection.query(
    'INSERT INTO "questions" (question, student, "group", tags) VALUES ($1, $2, $3, $4);',
    [question, student, group, tags],
  );
};

export {
  insertQuestion,
  Question,
  generateRandomQuestion,
};
