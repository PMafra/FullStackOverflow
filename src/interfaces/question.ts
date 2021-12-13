interface Question {
    question: string,
    student: string,
    group: string,
    tags?: string,
}

interface QuestionDB extends Question {
  id?: number,
  answered: boolean,
  submitAt: string,
}

interface AnsweredQuestionDB extends QuestionDB {
  question_id: number,
  answeredBy: string,
  answer: string,
  answeredAt: string,
  name: string,
}

interface FormatedQuestion extends QuestionDB {
  answeredBy?: string,
  answeredAt?: string,
  answer?: string,
}

export {
  Question,
  QuestionDB,
  AnsweredQuestionDB,
  FormatedQuestion,
};
