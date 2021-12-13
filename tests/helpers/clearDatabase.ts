import connection from '../../src/database/database';

const del = 'DELETE FROM';

const clearDatabase = async () => {
  await connection.query(`
    ${del} "answered_questions";
    ${del} "users";
    ${del} "questions";
  `);
};

export default clearDatabase;
