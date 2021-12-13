import { UserDB } from './user';

interface Answer {
    questionId: number,
    answer: string,
    user?: UserDB,
    userId?: number,
}

export {
  Answer,
};
