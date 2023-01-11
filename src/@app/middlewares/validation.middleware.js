import validations from '@app/validations';
import { isObject, isEmpty } from '@app/utils/object.util';
import { responseUtils } from '@app/utils';

const validationMiddleware = (request, response, next) => {
  /* Execute */
  if (isObject(request.params) && !isEmpty(request.params)) {
    /* Parameter */
    try {
      for (const [key, value] of Object.entries(request.params)) {
        const { error } = validations.objectId.validate(value);
        if (error) {
          throw new Error(key);
        }
      }
    } catch (error) {
      responseUtils.buildErrorResponse(response, { message: `Invalid ${error?.message}`});
    }
  }
  /* Skip */
  next();
}

export default validationMiddleware;