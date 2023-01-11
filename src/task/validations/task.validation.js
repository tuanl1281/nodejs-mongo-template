import Joi from 'joi';

const getTasks = Joi.object()
  .keys({
    pageIndex: Joi.number().min(0).default(0),
    pageSize: Joi.number().min(0).max(500).default(10),
  })
  .options({
    stripUnknown: true,
  });

const createTask = Joi.object()
  .keys({
    description: Joi.string().required(),
  })
  .options({
    stripUnknown: true,
  });

const updateTask = Joi.object()
  .keys({
    description: Joi.string().required(),
  })
  .options({
    stripUnknown: true,
  });

export { getTasks, createTask, updateTask };

export default {
  getTasks,
  createTask,
  updateTask,
};
