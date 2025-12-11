import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';
const verifyJWT = async(req,res,next) => {
  const token = req.cookies.accessToken;
  if(!token) {
    return res.status(401).json({
      message: "User is not logged in."
    });
  }

  const decodedToken = jwt.verify(token, 'secretkey');
  const loggedInUser = await User.findById(decodedToken.id);
  if(!loggedInUser) {
    return res.status(401).json({
      message: "User authentication failed."
    });
  }

  req.user = loggedInUser;
  next();
}

export default verifyJWT;