import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  uname: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  todos: [{
    type: mongoose.Types.ObjectId,
    ref:'Todo'
  }]
},
{timestamps: true});

const User = mongoose.model('User', userSchema)

export default User