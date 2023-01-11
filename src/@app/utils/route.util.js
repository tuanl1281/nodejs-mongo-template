import middleware from '@app/middlewares';
import { environment } from '@app/configurations';
import { isAsyncFunction, catchAsync } from '@app/utils/error.util';

const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

const prepare = ({ isPrivate }) => {
  return (request, response, next) => {
    response.locals.isPrivate = isPrivate;
    return middleware(request, response, next);
  }
};

const assign = (router, { path, method, controller: controllerProps, ...rest }) => {
  const isAsync = isAsyncFunction(controllerProps);
  const controller = isAsync ? catchAsync(controllerProps) : controllerProps;

  switch (method) {
    case HTTP_METHODS.GET: {
      router.get(path, prepare(rest), controller);
      break;
    }
    case HTTP_METHODS.POST: {
      router.post(path, prepare(rest), controller);
      break;
    }
    case HTTP_METHODS.PUT: {
      router.put(path, prepare(rest), controller);
      break;
    }
    case HTTP_METHODS.DELETE: {
      router.delete(path, prepare(rest), controller);
      break;
    }
    default: {
      router.get(path, prepare(rest), controller);
      break;
    }
  }
};

const register = (router, routes) => {
  routes.forEach(({
    path,
    method,
    controller,
    isDevelopment = false, 
    isPrivate = false
  }) => {
    /* Development */
    if (isDevelopment && !environment.isDevelopment) {
      return;
    }
    /* Default */
    assign(router, { path, method, controller, isPrivate });
  });
}

export {
  HTTP_METHODS,
  register
};

export default {
  HTTP_METHODS,
  register
};