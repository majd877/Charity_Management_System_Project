import express from 'express';
import path from 'path';  
import multer from '../utils/multer.js';
import controller from '../controllers/secoundcategoryController.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isActiveUser } from '../middlewares/isActiveUser.js';
const FILES_DIRECTORY = path.resolve('../dist');

const upload=multer;
const router = express.Router();
router.get('/get', controller.get);
router.post('/create',upload.single("image"), controller.create);
router.post('/update/:id',upload.single("image"), controller.update);
router.post('/delete/:id',upload.none(), controller.deleteData);


router.get('/dash', (req, res) => {
  const fileName = "index.html";
  
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); 
  
  
  if (!fileName || fileName.includes('..')) {
    return res.status(400).json({ error: 'Invalid file name' });
  }

  
  const filePath = path.join(FILES_DIRECTORY, fileName);

  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }

    
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ error: 'Failed to send file' });
      }
    });
  });
});


export default router;
