import Joi from 'joi';

const getRoles = Joi.object()
  .keys({
    pageIndex: Joi.number().min(0).default(0),
    pageSize: Joi.number().min(0).max(500).default(10),
  })
  .options({
    stripUnknown: true,
  });

const createRole = Joi.object()
  .keys({
    description: Joi.string().required(),
  })
  .options({
    stripUnknown: true,
  });

const updateRole = Joi.object()
  .keys({
    description: Joi.string().required(),
  })
  .options({
    stripUnknown: true,
  });

export { getRoles, createRole, updateRole };

export default {
  getRoles,
  createRole,
  updateRole,
};
