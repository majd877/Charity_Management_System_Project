import mongoose from "mongoose";
import CategoryModel from "../models/categoryModel.js";
import EventModel from "../models/eventModel.js";
import UserModel from "../models/UserModel.js";
import ActionModel from "../models/actionModel.js";

const create = async (req, res, next) => {
  const file = req.file;
  let data = req.body;
  

  
  if (file) {
    data.image = file.path.replace("uploads\\", "");
  }

  try {
    await EventModel.create(data);
    return res.status(201).json({ success: true, message: data });
  } catch (error) {
    next(error);
  }
};

const createFromOwner = async (req, res, next) => {
  const file = req.file;
  let data = req.body;
  

  
  if (file) {
    data.image = file.path.replace("uploads\\", "");
  }
  data.req_status="في حالة الانتظار"
  data.beneficiary=req.authData._id
  try {
    await EventModel.create(data);
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
    await EventModel.findByIdAndUpdate(params, { $set: data }, { new: true, runValidators: true });

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
    await EventModel.findByIdAndDelete(params);

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
      beneficiaryObjId: {
        $convert: {
          input: "$beneficiary",
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
  {
  $lookup: {
    from: 'users',
    localField: 'beneficiaryObjId',
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

    const data = await EventModel.aggregate(pipeline);
    const total = await EventModel.countDocuments(searchFilter);

    const totalPages = Math.ceil(total / pageSize);

    return res.status(200).json({
      success: true,
      data:{data, total,
        limit: pageSize,
        page: pageNumber,
        pages: totalPages,},
     
    });
  } catch (error) {
    next(error);
  }
};
const getName=async(req,res,next)=>{
  const category=await CategoryModel.find().select("id name");
  const beneficiary=await UserModel.find({user_type:"beneficiary"}).select("id name");
  return res.json({category,beneficiary});
}
const getWhatIHave = async (req, res, next) => {
  try {
    const user = new mongoose.Types.ObjectId(req.authData._id); 

    const pipeline = [
      {
        $addFields: {
          beneficiaryObjId: {
            $convert: {
              input: "$beneficiary",
              to: "objectId",
              onError: null,
              onNull: null,
            },
          },
          categoryObjId: {
            $convert: {
              input: "$category",
              to: "objectId",
              onError: null,
              onNull: null,
            },
          },
        },
      },
      { $match: { beneficiaryObjId: user } },
      {
        $lookup: {
          from: 'users',
          localField: 'beneficiaryObjId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'category',
          localField: 'categoryObjId',
          foreignField: '_id',
          as: 'categoryDetails',
        },
      },
      {
        $unwind: {
          path: "$categoryDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    const data = await EventModel.aggregate(pipeline);

    for (const element of data) {
      element.actions = await ActionModel.find({ event: element._id.toString() }).lean();
      for (const item of element.actions) {
        item.user = await UserModel.findById(item.donors).lean();
      }
    }

    return res.status(200).json({
      success: true,
      data: { data },
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};


const getForAll = async (req, res, next) => {
  try {

    const pipeline = [
      {
        $addFields: {
          beneficiaryObjId: {
            $convert: {
              input: "$beneficiary",
              to: "objectId",
              onError: null,
              onNull: null,
            },
          },
          categoryObjId: {
            $convert: {
              input: "$category",
              to: "objectId",
              onError: null,
              onNull: null,
            },
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'beneficiaryObjId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'category',
          localField: 'categoryObjId',
          foreignField: '_id',
          as: 'categoryDetails',
        },
      },
      {
        $unwind: {
          path: "$categoryDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    const data = await EventModel.aggregate(pipeline);

    for (const element of data) {
      element.actions = await ActionModel.find({ event: element._id.toString() }).lean();
      for (const item of element.actions) {
        item.user = await UserModel.findById(item.donors).lean();
      }
    }

    return res.status(200).json({
      success: true,
      data: { data },
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};
export default {
  create,
  get,
  getForAll,
  getWhatIHave,
  update,
  createFromOwner,
  getName,
  deleteData
};
