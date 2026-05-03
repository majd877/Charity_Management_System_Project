import PermissionModel from '../models/permissionModel.js';
import RepresentativeModel from '../models/RepresentativeModel.js';
import UserModel from '../models/UserModel.js';
import { createNewUser, deleteUser, updatePassword, updateUser } from '../services/authService.js';
import { createNewRepresentative, editRepresentative, getRepresentative } from '../services/representativeService.js';
import bcryptjs from 'bcryptjs';

const create = async (req, res, next) => {
  const { email, name, password,latitude,longitude, ...other } = req.body;
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
      { email,latitude,longitude, name,password:hashedPassword, status: req.body.status ?? false,user_type:"representative" },
      res,
      next
    );
    
    other.user_id = user.id;
    other.image= file.path.replace("uploads\\", "");
    
    
    const representative = await createNewRepresentative(other);

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

    
    const representative = await editRepresentative(params, other);

    
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
 const RepresentativePermission = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body || {};

  
  const isEnabled = (v) =>
    v === 1 || v === "1" || v === true || v === "true" || v === "on";

  try {
    
    const enabledKeys = Object.entries(data)
      .filter(([, v]) => isEnabled(v))
      .map(([k]) => String(k));

    
    
    const allowedKeys = await PermissionModel.find({
      to: { $in: enabledKeys },
    }).distinct("to");

    
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: { permission: allowedKeys } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Update successful",
      user: updatedUser,
      permission: allowedKeys,
    });
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};
const deleteData = async (req, res, next) => {
  const params = req.params.id;

  try {
    
    const representative = await RepresentativeModel.findById(params);

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
    const data = await getRepresentative(req, res);
    return res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  get,
  update,
  RepresentativePermission,
  deleteData
};
