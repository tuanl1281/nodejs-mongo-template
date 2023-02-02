import mongoose from 'mongoose';
import { paginate, toJSON } from '@app/databases/mongo.database';

const RoleSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
  descrition: {
    type: String,
  },
});

// #region --- Plugins ---
RoleSchema.plugin(paginate);
RoleSchema.plugin(toJSON);
// #endregion

// #region --- Statics ---
// #endregion

// #region --- Methods ---
// #endregion

export default mongoose.model('Roles', RoleSchema);
