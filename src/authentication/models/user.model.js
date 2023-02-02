import mongoose from 'mongoose';
import { paginate, toJSON } from '@app/databases/mongo.database';

const UserSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
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
UserSchema.plugin(toJSON);
// #endregion

// #region --- Statics ---
// #endregion

// #region --- Methods ---
// #endregion

export default mongoose.model('Users', UserSchema);
