import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import timetamp from 'mongoose-timestamp';

import { isDevelopment } from '@app/configurations/environment.configuration';

const database = (url, options) => {
  mongoose.connect(url, options);

  mongoose.connection.on('error', (error) => {
    if (isDevelopment) {
      console.log(`[MongoDB] ${JSON.stringify(error)}`);
    }
  });

  mongoose.connection.on('connected', () => {
    if (isDevelopment) {
      console.log('[MongoDB] Connected');
    }
  });

  mongoose.connection.on('disconnected', () => {
    if (isDevelopment) {
      console.log('[MongoDB] Disconnected');
    }
  });
};

// #region --- Plugin ---
const toJSON = (schema) => {
  let transform;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc, ret, options) {
      if (schema.options.removePrivatePaths !== false) {
        removePrivatePaths(ret, schema);
      }

      if (schema.options.removeVersion !== false) {
        removeVersion(ret);
      }

      if (schema.options.normalizeId !== false) {
        normalizeId(ret);
      }

      if (transform) {
        return transform(doc, ret, options);
      }

      return ret;
    },
  });

  const normalizeId = (ret) => {
    if (ret._id && typeof ret._id === 'object' && ret._id.toString) {
      if (typeof ret.id === 'undefined') {
        ret.id = ret._id.toString();
      }
    }
    if (typeof ret._id !== 'undefined') {
      delete ret._id;
    }
  };

  const removePrivatePaths = (ret, schema) => {
    for (const path in schema.paths) {
      if (schema.paths[path].options && schema.paths[path].options.private) {
        if (typeof ret[path] !== 'undefined') {
          delete ret[path];
        }
      }
    }
  };

  const removeVersion = (ret) => {
    if (typeof ret.__v !== 'undefined') {
      delete ret.__v;
    }
  };
};

export { paginate, timetamp, toJSON };
// #endregion

export default database;
