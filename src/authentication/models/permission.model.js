import mongoose from 'mongoose';
import { paginate, toJSON } from '@app/databases/mongo.database';

const PermissionSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
  code: {
    type: String,
  },
  descrition: {
    type: String,
  },
});

// #region --- Plugins ---
PermissionSchema.plugin(paginate);
PermissionSchema.plugin(toJSON);
// #endregion

// #region --- Statics ---
// #endregion

// #region --- Methods ---
// #endregion

export default mongoose.model('Permissions', PermissionSchema);
