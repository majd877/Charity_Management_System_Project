import CategoryModel from "../models/categoryModel.js";
import UserModel from "../models/UserModel.js";
import EventModel from "../models/eventModel.js";
import SendMesaageModel from "../models/sendMesaageModel.js";
import mongoose from "mongoose";

const create = async (req, res, next) => {
   const userType=req.params.user;
  const file = req.file;
  const user=req.user;
  let data = req.body;
  if (file) {
    data.image = file.path.replace("uploads\\", "");
  }
  data.user_id=user._id;
  data.user=user;
  data.userType=userType
  try {
    await SendMesaageModel.create(data);
    return res.status(201).json({ success: true, message: data });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  const params = req.params.id;
  const file = req.file;
  let data = req.body;
  if (file) {
    data.image = file.path.replace("uploads\\", ""); 
  }
  try {
    await SendMesaageModel.findByIdAndUpdate(params, { $set: data }, { new: true, runValidators: true });
    return res.status(200).json({
      success: true,
      message: "Update successful",
    });
  } catch (error) {
    next(error);
  }
};


const deleteData = async (req, res, next) => {
  const params = req.params.id;

  try {
    await SendMesaageModel.findByIdAndDelete(params);

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
    const pageSize = parseInt(req.query.paginate) || 5;
    const skip = (pageNumber - 1) * pageSize;
    const userType=req.params.user;
    const searchQuery = req.query.search || '';
    const arr = ["name", "description"];

   const searchFilter = {
  ...(
    searchQuery
      ? {
          $or: arr.map((item) => ({
            [item]: { $regex: searchQuery, $options: "i" },
          }))
        }
      : {}
  ),
  userType: userType 
};
searchFilter.is_doubt=false;
  const pipeline = [
  {
    $addFields: {
      user_idObjId: {
        $convert: {
          input: "$user_id",
          to: "objectId",
          onError: null,
          onNull: null
        }
      }
    }
  },
  { $match: searchFilter },
  { $skip: skip },
  { $limit: pageSize },
  {
    $lookup: {
      from: 'users',
      localField: 'user_idObjId',
      foreignField: '_id',
      as: 'user'
    }
  },
  {
    $unwind: {
      path: "$user", 
      preserveNullAndEmptyArrays: true
    }
  }
];


    const data = await SendMesaageModel.aggregate(pipeline);
    const total = await SendMesaageModel.countDocuments(searchFilter);
    const totalPages = Math.ceil(total / pageSize);

    return res.status(200).json({
      success: true,
      data: {
        data,
        total,
        userType:userType,
        limit: pageSize,
        page: pageNumber,
        pages: totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getMyMessage = async (req, res, next) => {
  try {

   const searchFilter = {
 
  user_id: req.user._id
};
searchFilter.is_doubt=false;
  const pipeline = [
  {
    $addFields: {
      user_idObjId: {
        $convert: {
          input: "$user_id",
          to: "objectId",
          onError: null,
          onNull: null
        }
      }
    }
  },
  { $match: searchFilter },
 
];


    const data = await SendMesaageModel.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      data: {
        data,
        pages: 1,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getBeneficiary=async(req,res,next)=>{
  const beneficiary=await UserModel.find({user_type:"beneficiary"}).select("id name");
  return res.json({beneficiary});
}
const getDonors=async(req,res,next)=>{
  const donors=await UserModel.find({user_type:"donors"}).select("id name");
  return res.json({donors});
}
export default {
  create,
  get,
  getMyMessage,
  update,
  getBeneficiary,
  getDonors,
  deleteData
};
