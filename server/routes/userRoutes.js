import express from 'express';
import { getUsers, Login, signUp } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', signUp);
router.post('/login', Login);

export default router