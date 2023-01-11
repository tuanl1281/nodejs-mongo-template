import application from '@app';
import { mongo } from '@app/databases';
import environment from '@app/configurations/environment.configuration';

// #region --- Database ---
mongo(environment.mongodb.url, environment.mongodb.options);
// #endregion

application.listen(environment.port, () => {
  if (environment.isDevelopment) {
    console.log(`[Express] Running on ${environment.port}`);
  }
});
