const generateSelect = ({ table }: {table: string}) => `SELECT * FROM "${table}"`;

interface SelectQueryInterface {
    getAllNotAnswered?: boolean;
    id?: number,
    question?: string,
    student?: string,
    group?: string,
    token?: string,
    name?: string,
}

interface HelperInterface extends SelectQueryInterface {
    baseQuery?: string;
}

const filterHelper = ({
  baseQuery, getAllNotAnswered, id, question, student, group, name, token,
}: HelperInterface) => {
  let finalQuery = baseQuery;
  const preparedValues = [];

  if (getAllNotAnswered) {
    finalQuery += ' WHERE answered = FALSE';
  }

  if (id) {
    preparedValues.push(id);
    if (preparedValues.length > 1) {
      finalQuery += ` AND id = $${preparedValues.length}`;
    } else {
      finalQuery += ` WHERE id = $${preparedValues.length}`;
    }
  }
  if (question) {
    preparedValues.push(question);
    if (preparedValues.length > 1) {
      finalQuery += ` AND question = $${preparedValues.length}`;
    } else {
      finalQuery += ` WHERE question = $${preparedValues.length}`;
    }
  }
  if (student) {
    preparedValues.push(student);
    if (preparedValues.length > 1) {
      finalQuery += ` AND student = $${preparedValues.length}`;
    } else {
      finalQuery += ` WHERE student = $${preparedValues.length}`;
    }
  }
  if (group) {
    preparedValues.push(group);
    if (preparedValues.length > 1) {
      finalQuery += ` AND "group" = $${preparedValues.length}`;
    } else {
      finalQuery += ` WHERE "group" = $${preparedValues.length}`;
    }
  }
  if (name) {
    preparedValues.push(name);
    if (preparedValues.length > 1) {
      finalQuery += ` AND name = $${preparedValues.length}`;
    } else {
      finalQuery += ` WHERE name = $${preparedValues.length}`;
    }
  }
  if (token) {
    preparedValues.push(token);
    if (preparedValues.length > 1) {
      finalQuery += ` AND token = $${preparedValues.length}`;
    } else {
      finalQuery += ` WHERE token = $${preparedValues.length}`;
    }
  }

  return {
    finalQuery,
    preparedValues,
  };
};

export { filterHelper, SelectQueryInterface, generateSelect };
