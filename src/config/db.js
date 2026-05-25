import mongoose from 'mongoose';

const connectDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI not set; database connection skipped.');
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
};

export default connectDatabase;