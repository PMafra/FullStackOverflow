import { v4 as uuid } from 'uuid';
import { User } from '../interfaces/user';
import * as userRepository from '../repositories/userRepository';
import ConflictError from '../errors/conflictError';

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

export {
  insertUser,
};
