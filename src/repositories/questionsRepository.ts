import { QueryResult } from 'pg';
import connection from '../database/database';
import { Question, AnsweredQuestionDB } from '../interfaces/question';
import { Answer } from '../interfaces/answer';
import { filterHelper, generateSelect } from '../helpers/queryHelper';
import { SelectQueryInterface } from '../interfaces/query';

const insertQuestion = async ({
  question, student, group, tags,
}: Question): Promise<number> => {
  const result = await connection.query(
    'INSERT INTO "questions" (question, student, "group", tags) VALUES ($1, $2, $3, $4) RETURNING id;',
    [question, student, group, tags],
  );
  return result.rows[0];
};

const selectQuery = async ({
  getAllNotAnswered, id, question, student, group,
}: SelectQueryInterface) => {
  const baseQuery = generateSelect({ table: 'questions' });
  const {
    finalQuery,
    preparedValues,
  } = filterHelper({
    baseQuery, getAllNotAnswered, id, question, student, group,
  });

  const result = await connection.query(`${finalQuery};`, preparedValues);

  if (getAllNotAnswered) {
    return result.rows;
  }

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

const selectAnsweredQuestionById = async (questionId: number): Promise<AnsweredQuestionDB> => {
  const result = await connection.query(
    'SELECT questions.*, "answered_questions".*, "users".name FROM "questions" JOIN "answered_questions" ON questions.id = "answered_questions"."question_id" JOIN users ON users.id = "answered_questions"."answeredBy" WHERE questions.id = $1;',
    [questionId],
  );
  return result.rows[0];
};

export {
  insertQuestion,
  insertNewAnswer,
  updateAnsweredState,
  selectAnsweredQuestionById,
  selectQuery,
};
