interface Question {
    question: string,
    student: string,
    group: string,
    tags?: string,
}

interface FormatedQuestion extends Question {
  answered: boolean,
  submitAt: string,
}

interface QuestionDB extends FormatedQuestion {
  id: number,
}

interface AnsweredQuestionDB extends QuestionDB {
  question_id: number,
  answeredBy: string,
  answer: string,
  answeredAt: string,
  name: string,
}

interface FormatedAnsweredQuestion extends QuestionDB {
  answeredBy: string,
  answeredAt: string,
  answer: string,
}

export {
  Question,
  QuestionDB,
  AnsweredQuestionDB,
  FormatedAnsweredQuestion,
  FormatedQuestion,
};
