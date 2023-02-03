import Joi from 'joi';

const getPermissions = Joi.object()
  .keys({
    pageIndex: Joi.number().min(0).default(0),
    pageSize: Joi.number().min(0).max(500).default(10),
  })
  .options({
    stripUnknown: true,
  });

const createPermission = Joi.object()
  .keys({
    code: Joi.string().required(),
    description: Joi.string().required(),
  })
  .options({
    stripUnknown: true,
  });

const updatePermission = Joi.object()
  .keys({
    code: Joi.string().required(),
    description: Joi.string().required(),
  })
  .options({
    stripUnknown: true,
  });

export { getPermissions, createPermission, updatePermission };

export default {
  getPermissions,
  createPermission,
  updatePermission,
};
