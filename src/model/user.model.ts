import { Schema, Types, model } from 'mongoose';

const defaultAvatar =
  'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg';

export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  gender: string;
  nickname: string;
  dateOfBirth: Date;
  language: string;
  nation: string;
  avatar: string;
  urlCode: string;
  balance: number;
  donate: number;
  followPlayers?: Types.ObjectId[];
  dateJoin: Date;
  donateTotal: number;
}

const User = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  nation: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    default: defaultAvatar,
  },
  urlCode: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  donate: {
    type: Number,
    required: true,
    default: 0,
  },
  followPlayers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player',
    },
  ],
  dateJoin: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  donateTotal: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default model('User', User);
