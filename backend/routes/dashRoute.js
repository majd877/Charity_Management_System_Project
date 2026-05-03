import express from 'express';
import controller from '../controllers/dashController.js';
import { isAdmin } from '../middlewares/isAdmin.js';



const router = express.Router();

router.get('/get', controller.get);

export default router;
