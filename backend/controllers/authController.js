import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status';
import {
    fetchUserFromEmailAndPassword,
    updatePassword,
    verifyCurrentPassword,
    verifyUserFromRefreshTokenPayload,
    createNewUser,
    fetchUserFromEmail,
    updateUserProfile
  } from '../services/authService.js';
  import {
    generateAuthTokens,
    clearRefreshToken,
    verifyRefreshToken,
    generateAccessTokenFromRefreshTokenPayload,
  } from '../services/tokenService.js';
import { OAuth2Client } from 'google-auth-library';
import UserModel from '../models/UserModel.js';
import ApiError from '../utils/apiError.js';
import { tokenTypes } from '../config/tokens.js';
import { verify } from '../utils/jwtHelpers.js';
const update = async (req, res, next) => {
  try {
    const { email, newPassword, password, name } = req.body;

    
    const authHeader = req.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
     
      
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Authorization header missing or malformed');
    }
    const accessToken = authHeader.split(' ')[1];

    
    const tokenPayload = await verify(accessToken, process.env.JWT_SECRET);
    if (!tokenPayload || tokenPayload.type !== tokenTypes.ACCESS) {
      
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid or expired access token');
    }

    
    const user = await UserModel.findOne({
      _id: tokenPayload.userId,
      status: true,
    });
    if (!user) {
      throw new ApiError(httpStatus.FORBIDDEN, 'User not found. Please log in again.');
    }

    
    const verifiedUser = await fetchUserFromEmail({ email: user.email, password });
    if (!verifiedUser) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid current password.');
    }

    
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    const updatedUser = await updateUserProfile(user._id, {
      email: email?.toLowerCase() || user.email,
      password: hashedPassword,
      name: name || user.name,
      source: "email",
    });

    
    const tokens = await generateAuthTokens(updatedUser);

    
    res.json({ user: updatedUser, tokens });
  } catch (error) {
    next(error);
  }
};

   
  const register = async (req, res, next) => {
    const {email, password} = req.body
    try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await createNewUser({
      email : email,
      password : hashedPassword,
      source : "email"
    });
    next(req.header)
    const tokens = await generateAuthTokens(newUser)
    res.json({user : newUser,tokens});
    } catch (error) {
      next(error);
    }
  };
  
   const login = async (req, res, next) => {
  
  
    try {
      const user = await fetchUserFromEmailAndPassword(req.body);
      
      const tokens = await generateAuthTokens(user);
      res.json({user,tokens});
    } catch (error) {
      next(error);
    }
  };
  
   const logout = async (req, res, next) => {
    try {
      await clearRefreshToken(req.body.refreshToken);
      res.json({});
    } catch (error) {
      next(error);
    }
  };
  
   const refreshToken = async (req, res, next) => {
    try {
      let refreshTokenPayload = await verifyRefreshToken(req.body.refreshToken);
      await verifyUserFromRefreshTokenPayload(refreshTokenPayload);
      let newAccessToken = await generateAccessTokenFromRefreshTokenPayload(
        refreshTokenPayload
      );
  
      res.json({
        accessToken: newAccessToken,
      });
    } catch (error) {
      next(error);
    }
  };
  
   const resetPassword = async (req, res, next) => {
    try {
      await verifyCurrentPassword(req.authData.userId, req.body.password);
      await updatePassword(req.authData.userId, req.body.newPassword);
  
      res.json({});
    } catch (error) {
      next(error);
    }
  };

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

  const googleUserRegister = async (req, res, next) => {
    try {
      const { token }  = req.body
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.CLIENT_ID
      });
      const { name, email, picture } = ticket.getPayload();   
      const newUser = await createNewUser({
        email : email,
        name : name,
        image : picture,
        source : "google"
      });
      const tokens = await generateAuthTokens(newUser)
    res.json({user : newUser,tokens});
  } catch (error) {
      next(error);
  }
  }
  const googleUserLogin = async (req, res, next) => {
    try {
      console.log("dd")
      const { token }  = req.body
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.CLIENT_ID
      });
      const { email} = ticket.getPayload();   
      const user = await fetchUserFromEmail({email});
      const tokens = await generateAuthTokens(user);
      res.json({user,tokens});
      } catch (error) {
        next(error);
      }
  }
 const createAdmin=async(req,res,next)=>{
  await UserModel.create({
    name: "admin admin",
  email: "admin@gmail.com",
   password: "$2a$10$yVTqzcQSHUqdG3l2L7sO3eB5jSmFGRtZ9QF1JIsqS1.gCVmPKIvbu",
   status:true,
  is_admin:"12314sgkehjnreklrwjhkahklargkraejkgrgjerhaljHEREHEREHERE",
  user_type:"admin",
  source:"email",
   only_show:true
  })
  return res.json({created:true})
 }
export default { 
  login, logout, refreshToken,createAdmin,  resetPassword, register,googleUserRegister,googleUserLogin,update
}