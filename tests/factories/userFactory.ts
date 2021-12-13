import faker from 'faker';
import connection from '../../src/database/database';
import { User as UserInterface } from '../../src/interfaces/user';

class User {
  name: string;

  group: string;

  token: string;

  constructor(name: string, group: string, token: string) {
    this.name = name;
    this.group = group;
    this.token = token;
  }
}

const generateRandomUser = () => ({
  name: faker.internet.userName(),
  group: faker.datatype.string(),
});

const insertUser = async ({
  name, group, token,
}: UserInterface) => {
  await connection.query(
    'INSERT INTO "users" (name, "group", token) VALUES ($1, $2, $3);',
    [name, group, token],
  );
};

export {
  insertUser,
  User,
  generateRandomUser,
};
