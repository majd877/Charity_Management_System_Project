import APIError from '../utils/apiError.js';
import { UserModel, RefreshTokenModel } from '../models/index.js';
import httpStatus from 'http-status';
import { tokenTypes } from '../config/tokens.js';
import { verify } from '../utils/jwtHelpers.js';

const isAuth = async (req, res, next) => {
  try {
    // Validate the user exists
    const userExists = await UserModel.exists({ email: req.body.email,status:true });
    if (!userExists) {
      throw new APIError(httpStatus.FORBIDDEN, 'User not found. Please log in again.');
    }
  
    next();
  } catch (error) {
    // Log the error for debugging
    console.error('Authentication error:', error.message);
    next(error); // Pass the error to the error-handling middleware
  }
};

export { isAuth };
