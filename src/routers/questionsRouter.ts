import { Router } from 'express';
import * as questionsController from '../controllers/questionsController';

const router = Router();

router.post('', questionsController.addNewQuestion);
router.get('', questionsController.obtainQuestions);

export default router;
