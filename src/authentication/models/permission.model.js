import mongoose from 'mongoose';
import { paginate, timetamp, toJSON } from '@app/databases/mongo.database';

const PermissionSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  description: {
    type: String,
  },
});

// #region --- Plugins ---
PermissionSchema.plugin(paginate);
PermissionSchema.plugin(timetamp, {
  createdAt: 'dateCreated',
  updatedAt: 'dateUpdated',
});
PermissionSchema.plugin(toJSON);
// #endregion

// #region --- Middlewares ---
// #endregion

// #region --- Statics ---
// #endregion

// #region --- Methods ---
// #endregion

export default mongoose.model('Permissions', PermissionSchema);
