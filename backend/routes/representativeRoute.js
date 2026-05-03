import express from 'express';
import controller from '../controllers/representativeController.js';
import multer from '../utils/multer.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isActiveUser } from '../middlewares/isActiveUser.js';




const upload = multer; 

const router = express.Router();


router.post('/create', upload.single('file'), controller.create);
router.post('/update/:id',isAdmin, upload.single('file'), controller.update);
router.post('/RepresentativePermission/:id',isAdmin, upload.single('file'), controller.RepresentativePermission);

router.post('/delete/:id',isAdmin, upload.none(), controller.deleteData);

router.get('/get',isActiveUser, controller.get);


export default router;
