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

interface AnsweredQuestion extends QuestionInfoDB {
  question_id: number,
  answeredBy: string,
  answer: string,
  answeredAt: string,
  name: string,
}

export {
  QuestionInfo,
  QuestionInfoDB,
  AnsweredQuestion,
};
