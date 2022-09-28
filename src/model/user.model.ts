import { Schema, model } from 'mongoose';
const User = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  nation: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  urlCode: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  donate: {
    type: Number,
    required: true,
    default: 0
  },
  followPlayers: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }],
  dateJoin: {
    type: Date,
    required: true,
    default: Date.now()
  },
  donateTotal: {
    type: Number,
    required: true
  }
});

export default model('User', User);