import { ServiceError } from '@app/errors';

const isAsyncFunction = (func) => func.constructor.name === 'AsyncFunction';
const catchAsync = (func) => (request, response, next) => func(request, response, next).catch(next);

const getValidationError = (error) => {
  return new ServiceError(null, 'Invalid properties', error?.details);
}


export { 
  isAsyncFunction,
  catchAsync,
  getValidationError,
};

export default {
  isAsyncFunction,
  catchAsync,
  getValidationError,
};