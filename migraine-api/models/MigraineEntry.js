import mongoose from 'mongoose';

const migraineSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  trigger: {
    type: String
  },
  relief: {
    type: String
  },
  medication: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('MigraineEntry', migraineSchema);
