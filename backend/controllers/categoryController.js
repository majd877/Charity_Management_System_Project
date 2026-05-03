import { hasNoNumbersIgnoringHTML } from "../helper/hasNoNumbersIgnoringHTML.js";
import { translateText } from "../helper/translate.js";
import CategoryModel from "../models/categoryModel.js";

const create = async (req, res, next) => {
  const file = req.file;
  let data = req.body;
  
 
  
  if (file) {
    data.image = file.path.replace("uploads\\", "");
  }

  try {
    await CategoryModel.create(data);
    return res.status(201).json({ success: true, message: data });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  const params = req.params.id;
  const file = req.file;
  let data = req.body;
  const lan = await CategoryModel.find();
  const names = lan.map(item => item.name);

  for (const key in data) {
    const value = data[key];
    if (hasNoNumbersIgnoringHTML(value)) {
      for (const element of names) {
        if (!data[`${key}_${element}`] || data[`${key}_${element}`] === "<p><br></p>") {
          const translatedText = await translateText(value, element);
          
          data[`${key}_${element}`] = translatedText;
        }
      }
    }
  }
  if (file) {
    data.image = file.path.replace("uploads\\", ""); 
  }

  try {
    await CategoryModel.findByIdAndUpdate(params, { $set: data }, { new: true, runValidators: true });

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
    await CategoryModel.findByIdAndDelete(params);

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
const getName=async(req,res,next)=>{
  const data=await CategoryModel.find().select("id name");
  return res.json({data:data});
}
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
      { $match: searchFilter },
      { $skip: skip },
      { $limit: pageSize },
    ];

    const data = await CategoryModel.aggregate(pipeline);
    const total = await CategoryModel.countDocuments(searchFilter);

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
