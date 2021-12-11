interface QuestionInfo {
    question: string,
    student: string,
    group: string,
    tags: string,
}

interface QuestionInfoDB extends QuestionInfo {
  id: number,
}

export {
  QuestionInfo,
  QuestionInfoDB,
};
