import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import httpStatus from 'http-status';
import compression from 'compression';

import routes from '@app/routes';
import { ServiceError, UnauthorizedError } from '@app/errors';
import { responseUtils } from '@app/utils';

const application = express();

// #region --- Configuration ---
application.use(helmet()); // HTTP Header
application.use(cors()); // CORS

application.use(compression());
application.use(express.json());
application.use(express.urlencoded({ extended: true }));
// #endregion

// #region --- Routes ---
application.use('/v1', routes.v1);
// eslint-disable-next-line no-unused-vars
application.use((request, response, next) => response.status(httpStatus.NOT_FOUND).send());
// eslint-disable-next-line no-unused-vars
application.use((error, request, response, next) => {
  let status = httpStatus.INTERNAL_SERVER_ERROR;
  if (error instanceof ServiceError) {
    status = httpStatus.BAD_REQUEST;
  }

  if (error instanceof UnauthorizedError) {
    status = httpStatus.UNAUTHORIZED;
  }

  return responseUtils.buildErrorResponse(response, {
    status,
    code: error?.code,
    message: error?.message,
    details: error?.details,
  });
});
// #endregion

export default application;
