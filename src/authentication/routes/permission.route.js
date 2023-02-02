import express from 'express';

// eslint-disable-next-line no-unused-vars
import routeUtils, { HTTP_METHODS } from '@app/utils/route.util';

/**
 * @property {string} path - path of route
 * @property {enum} method - method of route
 * @property {function} controller - controller of route
 * @property {boolean} isDevelopment - development route which hidden on production
 * @property {boolean} isPrivate - route which protect by token
 */
const routes = [];

const router = express.Router();
routeUtils.register(router, routes);

export default router;
