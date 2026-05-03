import { hasNoNumbersIgnoringHTML } from "../helper/hasNoNumbersIgnoringHTML.js";
import { translateText } from "../helper/translate.js";
import DonorsModel from "../models/donorsModel.js";

const create = async (req, res, next) => {
  const file = req.file;
  let data = req.body;

  
  if (file) {
    data.image = file.path.replace("uploads\\", "");
  }

  try {
    await DonorsModel.create(data);
    return res.status(201).json({ success: true, message: data });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  const params = req.params.id;
  const file = req.file;
  let data = req.body;
  const lan = await DonorsModel.find();
  const names = lan.map(item => item.name);

  for (const key in data) {
    const value = data[key];
    if (hasNoNumbersIgnoringHTML(value)) {
      for (const element of names) {
        if (!data[`${key}_${element}`] || data[`${key}_${element}`] === "<p><br></p>") {
          const translatedText = await translateText(value, element);
          // إضافة الحقل الجديد إلى data
          data[`${key}_${element}`] = translatedText;
        }
      }
    }
  }
  if (file) {
    data.image = file.path.replace("uploads\\", ""); 
  }

  try {
    await DonorsModel.findByIdAndUpdate(params, { $set: data }, { new: true, runValidators: true });

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
    await DonorsModel.findByIdAndDelete(params);

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
const getName=async(req,res,next)=>{
  const data=await DonorsModel.find().select("id name");
  return res.json({data:data});
}
const get = async (req, res, next) => {
  try {
    const pageNumber = parseInt(req.query.page) || 1; // Current page number
    const pageSize = parseInt(req.query.paginate) || 5; // Items per page
    const skip = (pageNumber - 1) * pageSize;

    const searchQuery = req.query.search || ''; // Search string
    const arr = ["name", "description"];

    const searchFilter = searchQuery
      ? {
          $or: arr.map((item) => ({
            [item]: { $regex: searchQuery, $options: "i" }, // Case-insensitive match
          })),
        }
      : {};

    const pipeline = [
      { $match: searchFilter },
      { $skip: skip },
      { $limit: pageSize },
    ];

    const data = await DonorsModel.aggregate(pipeline);
    const total = await DonorsModel.countDocuments(searchFilter);

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

export default {
  create,
  get,
  getName,
  update,
  deleteData
};
