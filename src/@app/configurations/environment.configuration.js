import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import * as dotenv from 'dotenv';
import validations from '@app/validations';

// #region --- Parse ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });
const { value: envVars, error } = validations.environment.validate(process.env);
if (error) {
  throw new Error('Invalid environment');
}
// #endregion

const isDevelopment = envVars.NODE_ENV;
const isTest = envVars.NODE_ENV === 'test';
const port = envVars.PORT;

// #region --- Database ---
const mongodb = {
  url: envVars.MONGODB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
// #endregion

export { isDevelopment, isTest, port, mongodb };

export default {
  isDevelopment,
  isTest,
  port,
  mongodb,
};
