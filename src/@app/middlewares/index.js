import async from 'async';

import validationMiddleware from '@app/middlewares/validation.middleware';
import authenticationMiddleware from '@app/middlewares/authentication.middleware';

const middleware = async (request, response, next) => {
  let operations = [];
  /* Validation */
  operations.push(validationMiddleware.bind(null, request, response, next));
  /* Authentication */
  if (response.locals?.isPrivate) {
    operations.push(authenticationMiddleware.bind(null, request, response, next));
  }
  /* Execute */
  await async.series(operations, (error) => {
    next();
  });
}

export default middleware;