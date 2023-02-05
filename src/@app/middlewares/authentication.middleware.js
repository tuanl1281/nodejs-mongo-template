import jwt from 'jsonwebtoken';

import httpStatus from 'http-status';
import { jwt as jwtConfiguration } from '@app/configurations';

const authenticationMiddleware = async (request, response) => {
  /* Execute */
  try {
    const token = request.header('Authorization').replace(`${jwtConfiguration.tokenType} `, '');
    if (!token) {
      throw new Error();
    }

    const decrypt = jwt.decode(token);
    if (!decrypt) {
      throw new Error();
    }

    const { userId: id, name, username } = decrypt;
    if (typeof response.locals === 'object') {
      response.locals.user = {
        id,
        name,
        username,
      };
    }
  } catch (error) {
    response.status(httpStatus.UNAUTHORIZED).send();
  }
};

export default authenticationMiddleware;
