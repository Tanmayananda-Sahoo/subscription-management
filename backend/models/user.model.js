import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  }
},{timestamps: true});

// userSchema.pre("save", async function(next) {
//   if(!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });
userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = async function() {
  const accessToken = jwt.sign(
    {
      id: this._id, 
      username: this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY
    }
  )
  return accessToken;
}
userSchema.methods.generateRefreshToken = async function() {
  const refreshToken = jwt.sign(
    {
      id: this._id, 
      username: this.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY
    }
  )

  return refreshToken;
}
export const User = new mongoose.model('User', userSchema);
