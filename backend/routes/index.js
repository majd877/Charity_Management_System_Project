import express from 'express';
import cors from 'cors';  
import path from 'path';
import fs from 'fs';

import axios from 'axios';
import { translateText } from '../helper/translate.js';
import mongoose from 'mongoose';
import userRoute from "./userRoute.js"
import authRoute from "./authRoute.js"
import categoryRoute from "./categoryRoute.js"
import representativeRoute from "./representativeRoute.js"
import donorsRouter from "./donorsRouter.js"
import eventRoute from "./eventRoute.js"
import donorsUserRoute from "./donorsUserRoute.js"
import beneficiaryUserRoute from "./beneficiaryUserRoute.js"
import actionRouter from "./actionRouter.js"
import sendMessageRouter from "./sendMessageRouter.js"
import orderRoute from "./orderRoute.js"
import complaintsDonorsRoute from "./complaintsDonorsRoute.js"
import complaintsBeneficiaryRoute from "./complaintsBeneficiaryRoute.js"
import OrphanSponsorshipRoute from "./OrphanSponsorshipRoute.js"
import TreatmentCampaignRoute from "./TreatmentCampaignRoute.js"
import sendMessageDoubtRoute from "./sendMessageDoubtRoute.js"
import PermissionRoute from "./PermissionRoute.js"
import dashRoute from "./dashRoute.js"

const router = express.Router();


router.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));
// Environment Variable Example (Optional)
const FILES_DIRECTORY = path.resolve(process.env.FILES_DIRECTORY || './uploads');
router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/representative', representativeRoute);
router.use('/Category', categoryRoute);
router.use('/Donors', donorsRouter);
router.use('/Event', eventRoute);
router.use('/DonorsUser', donorsUserRoute);
router.use('/Beneficiary', beneficiaryUserRoute);
router.use('/Action', actionRouter);
router.use('/SendMessage', sendMessageRouter);
router.use('/sendMessageDoubt', sendMessageDoubtRoute);

router.use('/Order', orderRoute);
router.use('/ComplaintsDonors', complaintsDonorsRoute);
router.use('/ComplaintsBeneficiary', complaintsBeneficiaryRoute);
router.use('/OrphanSponsorship', OrphanSponsorshipRoute);
router.use('/TreatmentCampaign', TreatmentCampaignRoute);
router.use('/Permission', PermissionRoute);
router.use('/dash', dashRoute);

// Serve Image Files
router.get('/image/:name', (req, res) => {
  const fileName = req.params.name;
  
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); 
  // res.setHeader('Content-Type', 'image/png'); 
  
  
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



const db = mongoose.connection;



router.get('/get-location', async (req, res) => {
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    
    const response = await axios.get(`http://ip-api.com/json/${userIp}`);
    if (response.data.status === 'success') {
      res.json({ location: response.data });
    } else {
      res.status(400).json({ error: response.data.message });
    }
  } catch (error) {
    res.status(500).json({ error: userIp });
  }
});
export default router;



