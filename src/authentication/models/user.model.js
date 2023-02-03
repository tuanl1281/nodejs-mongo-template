/* eslint-disable @babel/no-invalid-this */
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { paginate, timetamp, toJSON } from '@app/databases/mongo.database';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

// #region --- Plugins ---
UserSchema.plugin(paginate);
UserSchema.plugin(timetamp, {
  createdAt: 'dateCreated',
  updatedAt: 'dateUpdated',
});
UserSchema.plugin(toJSON);
// #endregion

// #region --- Middlewares ---
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  /* Next */
  next();
});
// #endregion

// #region --- Statics ---
// #endregion

// #region --- Methods ---
// #endregion

export default mongoose.model('Users', UserSchema);
