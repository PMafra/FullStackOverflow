interface User {
    name: string,
    group: string,
    token?: string,
}

interface UserDB extends User {
  id: number,
}

export {
  User,
  UserDB,
};
