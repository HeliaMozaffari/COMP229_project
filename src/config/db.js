import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log('DEBUG MONGO_URI =>', uri);

    if (!uri) {
      console.error('MONGO_URI is not defined in .env');
      return;
    }

    await connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // process.exit(1);
  }
};

export default connectDB;
