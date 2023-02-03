import express from 'express';
import { userRoute, roleRoute, permissionRoute } from 'authentication/routes';
import { taskRoute } from 'task/routes';

const routes = [
  // #region --- Authentication ---
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/roles',
    route: roleRoute,
  },
  {
    path: '/permissions',
    route: permissionRoute,
  },
  // #endregion
  {
    path: '/tasks',
    route: taskRoute,
  },
];

const router = express.Router();
routes.forEach(({ path, route }) => router.use(path, route));

export default router;
