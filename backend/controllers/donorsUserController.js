import DonorsUserModel from '../models/donorsUserModel.js';
import { createNewUser, deleteUser, updatePassword, updateUser } from '../services/authService.js';
import { createNewRepresentative, editRepresentative, getRepresentative } from '../services/representativeService.js';
import bcryptjs from 'bcryptjs';

const create = async (req, res, next) => {
  const { email, name, password, ...other } = req.body;
  const file = req.file;
  if (!email || !name || !password) {
    return res.status(400).json({ error: `Missing required fields` });
  }
  const fileInfo = {
    originalName: file.originalname, 
    mimeType: file.mimetype, 
    size: file.size, 
    path: file.path, 
  };

  try {
    
    const hashedPassword = await bcryptjs.hash(password, 10);


    const user = await createNewUser(
      { email,name,password:hashedPassword, status: req.body.status 
        ?? false,user_type:"donors" },
      res,
      next
    );
    
    other.user_id = user.id;
    other.image= file.path.replace("uploads\\", "");
    
    
        const representative = await DonorsUserModel.create(other);

    return res.status(201).json({ success: true, user, representative,fileInfo });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  const params = req.params.id;
  const { email, name,longitude,latitude, password, status, ...other } = req.body;
  const file = req.file;

  
  const fileInfo = file
    ? {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
      }
    : null;

  const userUpdates = [];
  try {
    
    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      userUpdates.push({ password: hashedPassword });
    }

    
    if (name) userUpdates.push({ name });
    if (email) userUpdates.push({ email });
    if (status) userUpdates.push({ status });
    if (latitude) userUpdates.push({ latitude });
    if (longitude) userUpdates.push({ longitude });

    
    if (file) {
      other.image = file.path.replace("uploads\\", ""); 
    }

    
const representative = await DonorsUserModel.findByIdAndUpdate(
      params,
      { $set: other },
      { new: true, runValidators: true } 
    );
    
    const updatedUser = await updateUser(representative.user_id, userUpdates);

    
    return res.status(200).json({
      success: true,
      message: "Update successful",
      user: updatedUser,
      representative,
      fileInfo,
    });
  } catch (error) {
    next(error); 
  }
};
const deleteData = async (req, res, next) => {
  const params = req.params.id;

  try {
    
    const representative = await DonorsUserModel.findById(params);

    if (!representative) {
      return res.status(404).json({
        success: false,
        message: "Representative not found",
      });
    }

    
    const userId = representative.user_id;

    
    await deleteUser(userId);

    
    await representative.deleteOne();

    
    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error); 
  }
};

const get = async (req, res, next) => {
  try {
     const pageNumber = parseInt(req.query.page) || 1; 
   const pageSize = parseInt(req.query.paginate)||5; 
   const skip = (pageNumber - 1) * pageSize;

   
   const searchQuery = req.query.search || ''; 
   const arr=["about","phone"];
   
   const searchFilter = searchQuery
     ? { $or: [ 
         { 'user.name': { $regex: searchQuery, $options: 'i' } }, 
         { 'user.email': { $regex: searchQuery, $options: 'i' } }, 
         ...arr.map((item) => ({
          [item]: { $regex: searchQuery, $options: 'i' }  
        }))
       ] }
     : {}; 

   
   const pipeline = [
     {
       $lookup: {
         from: 'users', 
         localField: 'user_id', 
         foreignField: '_id', 
         as: 'user', 
       },
     },
     {
       $unwind: {
         path: '$user', 
         preserveNullAndEmptyArrays: true, 
       },
     },
     {
       $match: searchFilter, 
     },
     {
       $skip: skip, 
     },
     {
       $limit: pageSize, 
     },
   ];

   
   const representatives = await DonorsUserModel.aggregate(pipeline);

   
   const total = await DonorsUserModel.countDocuments(searchFilter);

   const totalPages = Math.ceil(total / pageSize);
return res.json({
     data:{data: representatives,
     total,
     limit: pageSize,
     page: pageNumber,
     pages: totalPages,}
   });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  get,
  update,
  deleteData
};
