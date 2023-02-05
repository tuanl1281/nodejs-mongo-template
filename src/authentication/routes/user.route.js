import express from 'express';

import { userController } from 'authentication/controllers';
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
    path: '/login',
    method: HTTP_METHODS.POST,
    controller: userController.loginUser,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/token',
    method: HTTP_METHODS.GET,
    controller: userController.getToken,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/information',
    method: HTTP_METHODS.GET,
    controller: userController.getInformation,
    isDevelopment: false,
    isPrivate: true,
  },
  {
    path: '/',
    method: HTTP_METHODS.GET,
    controller: userController.getUsers,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/:id',
    method: HTTP_METHODS.GET,
    controller: userController.getUser,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/',
    method: HTTP_METHODS.POST,
    controller: userController.createUser,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/:id',
    method: HTTP_METHODS.PUT,
    controller: userController.updateUser,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/:id',
    method: HTTP_METHODS.DELETE,
    controller: userController.deleteUser,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/:id/addPermissions',
    method: HTTP_METHODS.PUT,
    controller: userController.addPermissions,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/:id/removePermissions',
    method: HTTP_METHODS.PUT,
    controller: userController.removePermissions,
    isDevelopment: false,
    isPrivate: false,
  },
];
const router = express.Router();
routeUtils.register(router, routes);

export default router;
