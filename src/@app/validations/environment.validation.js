import Joi from 'joi';

const environment = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(5000),
    MONGODB_URL: Joi.when('NODE_ENV', {
      is: 'test',
      then: Joi.string().optional().allow(''),
      otherwise: Joi.string().required().description('MongoDB is required'),
    }),
  })
  .unknown();

export default environment;
