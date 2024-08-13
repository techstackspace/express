import mongoose from 'mongoose';
import { error, log } from '../debugger';

const MONGODB_URL = `${process.env.MONGODB_URL}`;
const connectionToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    log('Connection successful!');
  } catch (err) {
    if (err instanceof Error) {
      error('Connection error! ', err.message);
    }
  }
};

export default connectionToDB;
