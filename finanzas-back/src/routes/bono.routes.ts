import {Router} from 'express';
import { createBono } from '../controllers/bono.controller';
const router = Router();

router.post('/', createBono);
// router.get('/', getHonorariesByUserId);

export default router;