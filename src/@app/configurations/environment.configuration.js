import * as dotenv from 'dotenv';
import validations from '@app/validations';

// #region --- Parse --
dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
const { value: envVars, error } = validations.environment.validate(process.env);
if (error) {
  throw new Error('Invalid environment');
}
// #endregion

// #region --- Commmon ---
const isDevelopment = envVars.NODE_ENV;
const isTest = envVars.NODE_ENV === 'test';
const port = envVars.PORT;
// #endregion

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
