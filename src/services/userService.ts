import { v4 as uuid } from 'uuid';
import { User, UserDB } from '../interfaces/user';
import * as userRepository from '../repositories/userRepository';
import ConflictError from '../errors/conflictError';
import UnauthorizedError from '../errors/unauthorizedError';

const insertUser = async ({ name, group }: User): Promise<string> => {
  const isAlreadyRegistered = await userRepository.selectUser({
    name, group,
  });

  if (isAlreadyRegistered) {
    throw new ConflictError();
  }

  const newToken: string = uuid();

  const newUser = await userRepository.insertUser({
    name, group, token: newToken,
  });

  return newUser.token;
};

const selectUserByToken = async (token: string): Promise<UserDB> => {
  const user = await userRepository.selectUserByToken(token);

  if (!user) {
    throw new UnauthorizedError();
  }

  return user;
};

export {
  insertUser,
  selectUserByToken,
};
