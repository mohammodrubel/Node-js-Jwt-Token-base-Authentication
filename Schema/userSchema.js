const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the user model
const UserModel = mongoose.model('User', userSchema);

// Export the model
module.exports = UserModel;
