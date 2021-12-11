import connection from '../database/database';
import { QuestionInfo } from '../interfaces/questionInfo';

const insertQuestion = async ({
  question, student, group, tags,
}: QuestionInfo): Promise<number> => {
  const result = await connection.query(
    'INSERT INTO "questions" (question, student, "group", tags) VALUES ($1, $2, $3, $4) RETURNING id;',
    [question, student, group, tags],
  );
  return result.rows[0];
};

export {
  insertQuestion,
};
