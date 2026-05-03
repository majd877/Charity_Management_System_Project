import RepresentativeModel from "../models/RepresentativeModel.js";
import ApiError from "../utils/apiError.js";


const createNewRepresentative = async (req) => {
  try {
    const newRepresentative = await RepresentativeModel.create(req);
    return newRepresentative;
  } catch (error) {
    throw new ApiError("Error creating a new representative", error);
  }
};
const editRepresentative = async (id, updateData) => {
  try {
    
    const updatedRepresentative = await RepresentativeModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } 
    );

    if (!updatedRepresentative) {
      throw new ApiError("Representative not found", 404);
    }

    return updatedRepresentative;
  } catch (error) {
    throw new ApiError("Error updating representative", error.message);
  }
};


const getRepresentative = async (req, res) => {
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

   
   const representatives = await RepresentativeModel.aggregate(pipeline);

   
   const total = await RepresentativeModel.countDocuments(searchFilter);

   const totalPages = Math.ceil(total / pageSize);

   return{
     data: representatives,
     total,
     req: req.query,
     limit: pageSize,
     page: pageNumber,
     pages: totalPages,
   };
 } catch (error) {
   console.error(error);
   return res.status(500).json({ message: error.message });
 }
};




export {
  createNewRepresentative,
  getRepresentative,
  editRepresentative
};
