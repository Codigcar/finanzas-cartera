import {Router} from 'express';
import { createHonorary } from '../controllers/honorary.controller';
const router = Router();

router.post('/', createHonorary);

export default router;