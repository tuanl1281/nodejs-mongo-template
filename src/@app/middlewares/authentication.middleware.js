import httpStatus from 'http-status';

const authenticationMiddleware = async (request, response, next) => {
  /* Execute */
  try {
    const token = request.header('Authorization').replace('Bearer ', '');
    if (!token)
      throw new Error();
  } catch {
    response.status(httpStatus.UNAUTHORIZED).send();
  }
  /* Skip */
  next();
}

export default authenticationMiddleware;