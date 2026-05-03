
import OrderModel from "../models/orderModel.js";
import mongoose from "mongoose";

const create = async (req, res, next) => {
   const userType=req.params.user;
  const file = req.file;
  let data = req.body;
  if (file) {
    data.image = file.path.replace("uploads\\", "");
  }
  data.userType=userType
  try {
    await OrderModel.create(data);
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
    await OrderModel.findByIdAndUpdate(params, { $set: data }, { new: true, runValidators: true });
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
    await OrderModel.findByIdAndDelete(params);

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


    const data = await OrderModel.aggregate(pipeline);
    const total = await OrderModel.countDocuments(searchFilter);
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

export default {
  create,
  get,
  update,
  deleteData
};
