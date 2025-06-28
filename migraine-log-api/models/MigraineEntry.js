const mongoose = require('mongoose');

const migraineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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

module.exports = mongoose.model('MigraineEntry', migraineSchema);
