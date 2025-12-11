import bcrypt from 'bcrypt';
import {User} from '../models/user.model.js';

const registerUser = async(req,res) => {
  const {username, password, email} = req.body;
  if(!username || !password || !email) { //email optimization needed to check whether email proper format
    return res.status(400).json({
      message: "Username, password or email missing."
    });
  }

  const existingUser = await User.findOne(
    {
      $or: [
        {username: username},
        {email: email}
      ]
    }
  )
  if(existingUser) {
    return res.status(409).json({
      message: "Username or email already in use."
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    username,
    email,
    password: hashedPassword
  })

  const viewableUser = await User.findById(createdUser._id).select('-password -refreshToken');
  
  return res.status(201).json({
    message: "User registered successfully.",
    user: viewableUser
  });

};

const generateAccessTokenAndRefreshToken = async(userId) => {
  const user = await User.findById(userId);
  console.log(user);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();
  return {accessToken, refreshToken};
}

const loginUser = async(req,res) => {
  const {username, password} = req.body;
  if(!username || !password) {
    return res.status(400).json({
      message: "Username or password missing."
    });
  }
  const fetchedUser = await User.findOne({
    $or: [
      {username: username},
      {email: username}
    ]
  })
  if(!fetchedUser) {
    return res.status(401).json({
      message: "Invalid username or password."
    });
  }

  const isPasswordValid = fetchedUser.isValidPassword(password);
  if(!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid username or password."
    });
  }

  const viewableUser = await User.findById(fetchedUser._id).select('-password -refreshToken');

  const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(fetchedUser._id);
  const options = {
    httpOnly: true,
    secured: true
  }
  
  return res.status(201)
  .cookie('refreshToken', refreshToken, options)
  .cookie('accessToken', accessToken, options)
  .json({
    message: "User logged in successfully.",
    user: viewableUser
  });
}

const logOutUser =async(req,res) => {
  const user = req.user;
  user.refreshToken = null;
  await user.save();
  res
  .clearCookie('accessToken')
  .clearCookie('refreshToken')
  .status(200)
  .json({
    message: "User logged out successfully."
  });

}

const checkAuth = async(req,res) => {
  try {
    return res.status(200).json({
      message: "User is authenticated.",
      user: req.user
    })
  } catch (error) {
    console.log('User is not authenticated: ',error);
  }
}

export {loginUser, registerUser, logOutUser, checkAuth};