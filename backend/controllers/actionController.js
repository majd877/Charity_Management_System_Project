import CategoryModel from "../models/categoryModel.js";
import ActionModel from "../models/actionModel.js";
import UserModel from "../models/UserModel.js";
import EventModel from "../models/eventModel.js";
import mongoose from "mongoose";

const create = async (req, res, next) => {
  const file = req.file;
  let data = req.body;
  if (file) {
    data.image = file.path.replace("uploads\\", "");
  }
  try {
    await ActionModel.create(data);
    return res.status(201).json({ success: true, message: data });
  } catch (error) {
    next(error);
  }
};
const createForInside = async (req, res, next) => {
  const file = req.file;
  let data = req.body;
  if (file) {
    data.image = file.path.replace("uploads\\", "");
  }
  data.donors=req.authData._id;
  data.event=req.params.id;
  data.req_status="في حالة الانتظار"
  try {
    await ActionModel.create(data);
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
    await ActionModel.findByIdAndUpdate(params, { $set: data }, { new: true, runValidators: true });
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
    await ActionModel.findByIdAndDelete(params);

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

    const searchQuery = req.query.search || '';
    const arr = ["name", "description"];

    const searchFilter = searchQuery
      ? {
          $or: arr.map((item) => ({
            [item]: { $regex: searchQuery, $options: "i" },
          })),
        }
      : {};

    const pipeline = [
      {
        $addFields: {
          donorsObjId: {
            $convert: {
              input: "$donors",
              to: "objectId",
              onError: null,
              onNull: null
            }
          },
          eventObjId: {
            $convert: {
              input: "$event",
              to: "objectId",
              onError: null,
              onNull: null
            }
          },
          categoryObjId: {
            $convert: {
              input: "$category",
              to: "objectId",
              onError: null,
              onNull: null
            }
          },
        }
      },
      { $match: searchFilter },
      { $skip: skip },
      { $limit: pageSize },

      // Lookup user
      {
        $lookup: {
          from: 'users',
          localField: 'donorsObjId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true
        }
      },

      // Lookup event
      {
        $lookup: {
          from: 'event',
          localField: 'eventObjId',
          foreignField: '_id',
          as: 'event'
        }
      },
      {
        $unwind: {
          path: "$event",
          preserveNullAndEmptyArrays: true
        }
      },

      // Lookup category
      {
        $lookup: {
          from: 'category',
          localField: 'categoryObjId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true
        }
      }
    ];

    const data = await ActionModel.aggregate(pipeline);
    const total = await ActionModel.countDocuments(searchFilter);
    const totalPages = Math.ceil(total / pageSize);

    return res.status(200).json({
      success: true,
      data: {
        data,
        total,
        limit: pageSize,
        page: pageNumber,
        pages: totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getName=async(req,res,next)=>{
  const category=await CategoryModel.find().select("id name");
  const donors=await UserModel.find({user_type:"donors"}).select("id name");
  const event=await EventModel.find().select("id name");
  return res.json({category,donors,event});
}
const getWhatIBide=async(req,res,next)=>{
  try {
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.paginate) || 5;
    const skip = (pageNumber - 1) * pageSize;
    const user=new mongoose.Types.ObjectId(req.authData._id);;

    const pipeline = [
      {
        $addFields: {
          donorsObjId: {
            $convert: {
              input: "$donors",
              to: "objectId",
              onError: null,
              onNull: null
            }
          },
          eventObjId: {
            $convert: {
              input: "$event",
              to: "objectId",
              onError: null,
              onNull: null
            }
          },
          categoryObjId: {
            $convert: {
              input: "$category",
              to: "objectId",
              onError: null,
              onNull: null
            }
          },
        }
      },
      { $match:{donors:user}  },
      { $skip: skip },
      { $limit: pageSize },

      // Lookup user
      {
        $lookup: {
          from: 'users',
          localField: 'donorsObjId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true
        }
      },

      // Lookup event
      {
        $lookup: {
          from: 'event',
          localField: 'eventObjId',
          foreignField: '_id',
          as: 'event'
        }
      },
      {
        $unwind: {
          path: "$event",
          preserveNullAndEmptyArrays: true
        }
      },

      // Lookup category
      {
        $lookup: {
          from: 'category',
          localField: 'categoryObjId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true
        }
      }
    ];

    const data = await ActionModel.aggregate(pipeline);
    const total = await ActionModel.countDocuments({ donors: user });
    const totalPages = Math.ceil(total / pageSize);

    return res.status(200).json({
      success: true,
      data: {
        data,
        total,
        limit: pageSize,
        page: pageNumber,
        pages: totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
}
export default {
  create,
  get,
  update,
  getWhatIBide,
  createForInside,
  getName,
  deleteData
};
