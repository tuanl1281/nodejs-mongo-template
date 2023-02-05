import validationMiddleware from '@app/middlewares/validation.middleware';
import authenticationMiddleware from '@app/middlewares/authentication.middleware';

const middleware = async (request, response, next) => {
  let operations = [];
  /* Validation */
  operations.push(validationMiddleware);
  /* Authentication */
  if (response.locals?.isPrivate) {
    operations.push(authenticationMiddleware);
  }
  /* Execute */
  try {
    for (const operation of operations) {
      await operation(request, response);
    }
  } catch (error) {
    /* Error */
    next(error);
  }
  /* Default */
  next();
};

export default middleware;
