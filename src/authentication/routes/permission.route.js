import express from 'express';

import { permissionController } from 'authentication/controllers';
import routeUtils, { HTTP_METHODS } from '@app/utils/route.util';

/**
 * @property {string} path - path of route
 * @property {enum} method - method of route
 * @property {function} controller - controller of route
 * @property {boolean} isDevelopment - development route which hidden on production
 * @property {boolean} isPrivate - route which protect by token
 */
const routes = [
  {
    path: '/',
    method: HTTP_METHODS.GET,
    controller: permissionController.getPermissions,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/:id',
    method: HTTP_METHODS.GET,
    controller: permissionController.getPermission,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/',
    method: HTTP_METHODS.POST,
    controller: permissionController.createPermission,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/:id',
    method: HTTP_METHODS.PUT,
    controller: permissionController.updatePermission,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/:id',
    method: HTTP_METHODS.DELETE,
    controller: permissionController.deletePermission,
    isDevelopment: false,
    isPrivate: false,
  },
];

const router = express.Router();
routeUtils.register(router, routes);

export default router;
