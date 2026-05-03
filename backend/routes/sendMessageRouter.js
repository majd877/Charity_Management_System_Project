import express from 'express';
import path from 'path';  
import multer from '../utils/multer.js';
import controller from '../controllers/sendMessageController.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isActiveUser } from '../middlewares/isActiveUser.js';
const FILES_DIRECTORY = path.resolve('../dist');

const upload=multer;
const router = express.Router();
router.get('/get/:user',isActiveUser, controller.get);
router.get('/getMyMessage',isActiveUser, controller.getMyMessage);
router.get('/getDonors',isActiveUser, controller.getDonors);
router.get('/getBeneficiary',isActiveUser, controller.getBeneficiary);
router.post('/create/:user',isActiveUser,upload.single("image"), controller.create);
router.post('/update/:id',isActiveUser,upload.single("image"), controller.update);
router.post('/delete/:id',isActiveUser,upload.none(), controller.deleteData);
 



export default router;
