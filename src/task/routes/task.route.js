import express from 'express';

import taskController from 'task/controllers/task.controller';
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
    controller: taskController.getTasks,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/:id',
    method: HTTP_METHODS.GET,
    controller: taskController.getTask,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/',
    method: HTTP_METHODS.POST,
    controller: taskController.createTask,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/:id',
    method: HTTP_METHODS.PUT,
    controller: taskController.updateTask,
    isDevelopment: false,
    isPrivate: false,
  },
  {
    path: '/:id',
    method: HTTP_METHODS.DELETE,
    controller: taskController.deleteTask,
    isDevelopment: false,
    isPrivate: false,
  },
]

const router = express.Router();
routeUtils.register(router, routes);

export default router;