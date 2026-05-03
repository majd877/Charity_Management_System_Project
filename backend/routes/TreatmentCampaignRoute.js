import express from 'express';
import controller from '../controllers/TreatmentCampaignController.js';
import multer from '../utils/multer.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isActiveUser } from '../middlewares/isActiveUser.js';




const upload = multer; 

const router = express.Router();


router.post('/create',isActiveUser, upload.single('file'), controller.create);
router.post('/update/:id',isActiveUser, upload.single('file'), controller.update);
router.post('/delete/:id',isActiveUser, upload.none(), controller.deleteData);

router.get('/get',isActiveUser, controller.get);


export default router;
