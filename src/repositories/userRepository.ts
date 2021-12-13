import connection from '../database/database';
import { User, UserDB } from '../interfaces/user';
import { filterHelper, generateSelect } from '../helpers/queryHelper';
import { SelectQueryInterface } from '../interfaces/query';

const insertUser = async ({
  name, group, token,
}: User): Promise<UserDB> => {
  const result = await connection.query(
    'INSERT INTO "users" (name, "group", token) VALUES ($1, $2, $3) RETURNING *;',
    [name, group, token],
  );
  return result.rows[0];
};

const selectQuery = async ({
  token, name, group,
}: SelectQueryInterface) => {
  const baseQuery = generateSelect({ table: 'users' });
  const {
    finalQuery,
    preparedValues,
  } = filterHelper({
    baseQuery, token, name, group,
  });

  const result = await connection.query(`${finalQuery};`, preparedValues);

  return result.rows[0];
};

export {
  insertUser,
  selectQuery,
};
