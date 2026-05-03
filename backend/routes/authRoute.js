import express from 'express';
import { isActiveUser } from '../middlewares/isActiveUser.js';
import { isAuth } from '../middlewares/isAuth.js';

import validate from '../utils/yupValidations.js';
import controller from '../controllers/authController.js';
import trimRequest from 'trim-request';

import schemas from '../validations/authValidations.js';
import multer from '../utils/multer.js';

const router = express.Router();
router.route('/createAdmin')
  .get(multer.none(), controller.createAdmin);
router
  .route('/login')
  .post(multer.none(),isAuth, validate(schemas.loginSchema), controller.login);

router
  .route('/logout')
  .post(multer.none(), validate(schemas.logoutSchema), controller.logout);

router
  .route('/refresh-token')
  .post(multer.none(), validate(schemas.refreshTokenSchema), controller.refreshToken);

router
  .route('/register')
  .post(multer.none(), validate(schemas.registerSchema), controller.register);
  router
  .route('/update')
  .post(multer.none(), validate(schemas.loginSchema), controller.update);
  
router
  .route('/reset-password')
  .post(
    multer.none(),
    validate(schemas.resetPasswordSchema),
    isActiveUser,
    controller.resetPassword
  );

router
  .route("/google-register")
  .post(
    trimRequest.all,
    validate(schemas.googleUserSchema),
    controller.googleUserRegister
  )

router
  .route("/google-login")
  .post(
    trimRequest.all,
    validate(schemas.googleUserSchema),
    controller.googleUserLogin
  )
 
export default router;
