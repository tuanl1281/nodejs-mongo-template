import httpStatus from 'http-status';
import { jwt as jwtConfiguration } from '@app/configurations';

const authenticationMiddleware = async (request, response, next) => {
  /* Execute */
  try {
    const token = request.header('Authorization').replace(`${jwtConfiguration.tokenType} `, '');
    if (!token) throw new Error();
  } catch {
    response.status(httpStatus.UNAUTHORIZED).send();
  }
  /* Skip */
  next();
};

export default authenticationMiddleware;
