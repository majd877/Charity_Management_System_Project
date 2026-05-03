
  import { UserModel } from '../models/index.js';
  import httpStatus from 'http-status';
  
  import APIError from '../utils/apiError.js';
  import bcrypt from 'bcryptjs';
  
  const createNewUser = async(user)=>{
    const oldUser =await UserModel.findOne({ email:user.email.toLowerCase() });
    if(oldUser)
      throw new APIError(httpStatus.BAD_REQUEST,"Email already exists.")
    const newUser = await UserModel.create(user);
    if(!newUser)
      throw new APIError(httpStatus.BAD_REQUEST,"Oops...seems our server needed a break!")
    return newUser;
  }

  const createNewGoogleUser = async({ id, email, firstName, lastName, profilePhoto }) => {
    const oldUser =await UserModel.findOne({ email: email.toLowerCase() });
    if(oldUser)
      throw new APIError(httpStatus.BAD_REQUEST,"Email already exists.")
    const newUser = await UserModel.create({email, source: "google"});
    if(!newUser)
      throw new APIError(httpStatus.BAD_REQUEST,"Oops...seems our server needed a break!")
    return newUser;
  }

  const fetchUserFromEmailAndPassword = async ({ email, password }) => {
    
    const user = await UserModel.findOne({
      email: email.toLowerCase(), 
    }).lean();
  
    
    if (!user) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Invalid credentials');
    }
  
    
    const passwordMatches = await bcrypt.compare(password, user.password);
  
    
    if (!passwordMatches) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Invalid credentials');
    }
  
    
    const { password: _, ...userWithoutPassword } = user; 
  return userWithoutPassword;;
  };
  
  const fetchUserFromEmail= async ({ email }) => {
    const user = await UserModel.findOne({
      email: email.toLowerCase(),
    })
    .lean();
  
    if (!user)
      throw new APIError(httpStatus.BAD_REQUEST, 'please sign up - this email does not exist');
  
    return user;
  };
  
  const verifyUserFromRefreshTokenPayload = async ({ userId }) => {
    const userExists = await UserModel.exists({
      _id: userId,
    });
  
    if (!userExists)
      throw new APIError(httpStatus.FORBIDDEN, 'Invalid Refresh Token - logout');
  };
  
  const fetchUserFromAuthData = async ({ userId }) => {
    const user = await UserModel.findOne({
      _id: userId,
    })
      .lean();
  
    if (!user)
      throw new APIError(httpStatus.UNAUTHORIZED, 'invalid access token user');
  
    return user;
  };
  
  const verifyCurrentPassword = async (userId, password) => {
    const user = await UserModel.findOne({
      _id: userId,
    })
      .select('password')
      .lean();
  
    let passwordMatches = await bcrypt.compare(password, user.password);
  
    if (!passwordMatches)
      throw new APIError(httpStatus.BAD_REQUEST, 'invalid current password');
  };
  
  const updatePassword = async (userId, newPassword) => {
    let newHash = await bcrypt.hash(newPassword, 10);
  
    let user = await UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        password: newHash,
      },
      {
        new: true,     
      }
    );

  };
  const updateUser = async (userId, updatesArray) => {
    try {
      
      const updates = updatesArray.reduce((acc, update) => {
        return { ...acc, ...update };
      }, {});
  
      
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $set: updates },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        throw new Error("User not found");
      }
  
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  };
  const updateUserProfile = async (userId, updates) => {
    try {
      
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $set: updates },
        { new: true, runValidators: true } 
      );
  
      
      if (!updatedUser) {
        throw new Error("User not found");
      }
  
      return updatedUser;
    } catch (error) {
      
      throw new Error(`Failed to update user: ${error.message}`);
    }
  };
  
  const deleteUser=async(userId)=>{
     const deleteUser=await UserModel.findByIdAndDelete({ _id: userId });
     if (!deleteUser) {
      throw new Error("User not found");
    }

    return deleteUser;
  }

  export {
    fetchUserFromEmailAndPassword,
    fetchUserFromEmail,
    verifyUserFromRefreshTokenPayload,
    fetchUserFromAuthData,
    verifyCurrentPassword,
    updatePassword,
    createNewUser,
    updateUser,
    createNewGoogleUser,
    deleteUser,
    updateUserProfile
  };
  