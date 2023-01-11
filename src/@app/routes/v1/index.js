import express from 'express';
import { taskRoute } from 'task/routes';

const routes = [
  {
    path: '/tasks',
    route: taskRoute,
  },
];

const router = express.Router();
routes.forEach(({ path, route }) => router.use(path, route));

export default router;