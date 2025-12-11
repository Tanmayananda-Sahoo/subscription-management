import mongoose from 'mongoose';

const connectDB = async(req, res) => {
  const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URL}`);
  console.log(connectionInstance.connection.host);
}

export default connectDB;