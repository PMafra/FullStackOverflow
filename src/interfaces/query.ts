interface SelectQueryInterface {
    getAllNotAnswered?: boolean;
    id?: number,
    question?: string,
    student?: string,
    group?: string,
    token?: string,
    name?: string,
}

export {
  SelectQueryInterface,
};
