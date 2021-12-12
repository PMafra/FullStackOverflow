import connection from '../database/database';
import { User, UserDB } from '../interfaces/user';

const insertUser = async ({
  name, group, token,
}: User): Promise<UserDB> => {
  const result = await connection.query(
    'INSERT INTO "users" (name, "group", token) VALUES ($1, $2, $3) RETURNING *;',
    [name, group, token],
  );
  return result.rows[0];
};

const selectUser = async ({
  name, group,
}: User): Promise<UserDB> => {
  const result = await connection.query(
    'SELECT * FROM "users" WHERE name = $1 AND "group" = $2;',
    [name, group],
  );
  return result.rows[0];
};

export {
  selectUser,
  insertUser,
};
