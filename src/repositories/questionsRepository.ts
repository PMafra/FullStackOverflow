import { QueryResult } from 'pg';
import connection from '../database/database';
import { QuestionInfo, QuestionInfoDB, AnsweredQuestion } from '../interfaces/questionInfo';
import { Answer } from '../interfaces/answer';

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

const selectQuestionById = async (questionId: number): Promise<QuestionInfoDB> => {
  const result = await connection.query(
    'SELECT * FROM "questions" WHERE id = $1;',
    [questionId],
  );
  return result.rows[0];
};

const insertNewAnswer = async ({
  questionId, answer, userId,
}: Answer): Promise<QueryResult> => {
  const result = await connection.query(
    'INSERT INTO "answered_questions" ("question_id", "answeredBy", answer) VALUES ($1, $2, $3)',
    [questionId, userId, answer],
  );
  return result;
};

const updateAnsweredState = async (questionId: number): Promise<QueryResult> => {
  const result = await connection.query(
    'UPDATE "questions" SET answered = TRUE WHERE id = $1',
    [questionId],
  );
  return result;
};

const selectAnsweredQuestionById = async (questionId: number): Promise<AnsweredQuestion> => {
  const result = await connection.query(
    'SELECT questions.*, "answered_questions".* FROM "questions" JOIN "answered_questions" ON questions.id = "answered_questions"."question_id" JOIN users ON users.id = "answered_questions"."answeredBy" WHERE questions.id = $1;',
    [questionId],
  );
  return result.rows[0];
};

export {
  insertQuestion,
  selectQuestion,
  selectQuestions,
  selectQuestionById,
  insertNewAnswer,
  updateAnsweredState,
  selectAnsweredQuestionById,
};
