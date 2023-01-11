import mongoose from 'mongoose';
import { paginate, toJSON } from '@app/databases/mongo.database';

const TaskSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
});

// #region --- Plugins ---
TaskSchema.plugin(paginate);
TaskSchema.plugin(toJSON);
// #endregion

// #region --- Statics ---
// #endregion

// #region --- Methods ---
// #endregion

export default mongoose.model('Tasks', TaskSchema);
