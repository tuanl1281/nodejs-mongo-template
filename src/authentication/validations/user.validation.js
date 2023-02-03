import Joi from 'joi';

const getUsers = Joi.object()
  .keys({
    pageIndex: Joi.number().min(0).default(0),
    pageSize: Joi.number().min(0).max(500).default(10),
  })
  .options({
    stripUnknown: true,
  });

const createUser = Joi.object()
  .keys({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
  .options({
    stripUnknown: true,
  });

const updateUser = Joi.object()
  .keys({
    name: Joi.string().required(),
  })
  .options({
    stripUnknown: true,
  });

export { getUsers, createUser, updateUser };

export default {
  getUsers,
  createUser,
  updateUser,
};
