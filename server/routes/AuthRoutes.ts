import express from 'express';
 const AuthRouter= express.Router();
import { registerUser, loginUser ,verifyUser,logoutUser} from '../controllers/AuthControllers.js';
import protect from '../middlewares/auth.js';

AuthRouter.post('/register',registerUser);
AuthRouter.post('/login',loginUser);
AuthRouter.get('/verify',protect,verifyUser);
AuthRouter.post('/logout',protect,logoutUser);

export default AuthRouter;
