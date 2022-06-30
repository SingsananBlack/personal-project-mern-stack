// Use mongoose
const mongoose = require('mongoose');

// Create collection + documents
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    enabled: { type: Boolean, default: true },
    address: String,
  },
  { timestamps: true }
);

// Create model + exprots model
module.exports = User = mongoose.model('users', userSchema);
