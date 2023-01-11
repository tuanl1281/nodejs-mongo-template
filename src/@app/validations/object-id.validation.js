import Joi from 'joi';

const objectId = Joi.string().hex().length(24).required();
export default objectId;