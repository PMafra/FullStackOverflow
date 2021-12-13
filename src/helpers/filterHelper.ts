/* eslint-disable @typescript-eslint/no-explicit-any */
interface SelectQueryInterface {
    getAllNotAnswered: boolean;
    id: number,
    question: string,
    student: string,
    group: string,
}

interface HelperInterface extends SelectQueryInterface {
    baseQuery: string;
}

const filterHelper = ({
  baseQuery, getAllNotAnswered, id, question, student, group,
}: HelperInterface) => {
  let finalQuery = baseQuery;
  const preparedValues = [];

  if (getAllNotAnswered) {
    finalQuery += ' WHERE answered = FALSE';
  }
  if (id) {
    preparedValues.push(id);
    if (preparedValues.length > 1) {
      finalQuery += ` AND id = ${preparedValues.length}`;
    }
    finalQuery += ` WHERE id = ${preparedValues.length}`;
  }
  if (question) {
    preparedValues.push(question);
    if (preparedValues.length > 1) {
      finalQuery += ` AND question = ${preparedValues.length}`;
    }
    finalQuery += ` WHERE question = ${preparedValues.length}`;
  }
  if (student) {
    preparedValues.push(student);
    if (preparedValues.length > 1) {
      finalQuery += ` AND student = ${preparedValues.length}`;
    }
    finalQuery += ` WHERE student = ${preparedValues.length}`;
  }
  if (group) {
    preparedValues.push(group);
    if (preparedValues.length > 1) {
      finalQuery += ` AND group = ${preparedValues.length}`;
    }
    finalQuery += ` WHERE group = ${preparedValues.length}`;
  }

  finalQuery += ';';

  return {
    finalQuery,
    preparedValues,
  };
};

export { filterHelper, SelectQueryInterface, HelperInterface };
