import express from 'express';
import controller from '../controllers/PermissionController.js';
import multer from '../utils/multer.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isActiveUser } from '../middlewares/isActiveUser.js';




const upload = multer; 

const router = express.Router();


router.post('/create', upload.single('file'), controller.create);

router.get('/get',isActiveUser, controller.get);


export default router;
