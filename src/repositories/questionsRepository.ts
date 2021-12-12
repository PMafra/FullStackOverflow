import connection from '../database/database';
import { QuestionInfo, QuestionInfoDB } from '../interfaces/questionInfo';

const insertQuestion = async ({
  question, student, group, tags,
}: QuestionInfo): Promise<number> => {
  const result = await connection.query(
    'INSERT INTO "questions" (question, student, "group", tags) VALUES ($1, $2, $3, $4) RETURNING id;',
    [question, student, group, tags],
  );
  return result.rows[0];
};

const selectQuestion = async ({
  question, student, group,
}: QuestionInfo): Promise<QuestionInfoDB> => {
  const result = await connection.query(
    'SELECT * FROM "questions" WHERE question = $1 AND student = $2 AND "group" = $3;',
    [question, student, group],
  );
  return result.rows[0];
};

const selectQuestions = async (): Promise<QuestionInfoDB[]> => {
  const result = await connection.query(
    'SELECT * FROM "questions" WHERE answered = FALSE;',
  );
  return result.rows;
};

export {
  insertQuestion,
  selectQuestion,
  selectQuestions,
};
