interface QuestionInfo {
    question: string,
    student: string,
    group: string,
    tags?: string,
}

interface QuestionInfoDB extends QuestionInfo {
  id: number,
  answered: boolean,
  submitAt: string,
}

export {
  QuestionInfo,
  QuestionInfoDB,
};
