/* eslint-disable @typescript-eslint/no-explicit-any */
import RequestError from '../errors/requestError';

const validateObjectWithJoi = async ({ object, schema }: any): Promise<boolean> => {
  const isCorrectBody = schema.validate(object);
  if (isCorrectBody.error) {
    throw new RequestError(isCorrectBody.error.details[0].message);
  }
  return true;
};

export {
  validateObjectWithJoi,
};
