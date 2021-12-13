import Joi from 'joi';

const newQuestionSchema = Joi.object().length(4).keys({
  question: Joi.string().min(1).required(),
  student: Joi.string().min(1).required(),
  group: Joi.string().min(1).required(),
  tags: Joi.string().min(1).required(),
});

const answerSchema = Joi.object().length(1).keys({
  question: Joi.string().min(1).required(),
});

const newUserSchema = Joi.object().length(2).keys({
  name: Joi.string().min(1).required(),
  group: Joi.string().min(1).required(),
});

export { newQuestionSchema, answerSchema, newUserSchema };
