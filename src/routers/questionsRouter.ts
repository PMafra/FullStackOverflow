import { Router } from 'express';
import * as questionsController from '../controllers/questionsController';
import auth from '../middlewares/auth';

const router = Router();

router.post('', questionsController.addNewQuestion);
router.get('', questionsController.obtainQuestions);
router.post('/:id', auth, questionsController.answerQuestion);

export default router;
