import mongoose from 'mongoose';
import { paginate, timetamp, toJSON } from '@app/databases/mongo.database';

const RoleSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  userIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserIds',
    },
  ],
  permissionIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permissions',
    },
  ],
});

// #region --- Plugins ---
RoleSchema.plugin(paginate);
RoleSchema.plugin(timetamp, {
  createdAt: 'dateCreated',
  updatedAt: 'dateUpdated',
});
RoleSchema.plugin(toJSON);
// #endregion

// #region --- Middlewares ---
// #endregion

// #region --- Statics ---
// #endregion

// #region --- Methods ---
// #endregion

export default mongoose.model('Roles', RoleSchema);
