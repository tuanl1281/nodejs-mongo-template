import { jwt as jwtConfiguration } from '@app/configurations';
import { UnauthorizedError } from '@app/errors';
import { responseUtils } from '@app/utils';
import { getValidationError } from '@app/utils/error.util';
import { userService } from 'authentication/services';
import { userValidation } from 'authentication/validations';

const getUsers = async (request, response) => {
  /* Validate */
  const { error, value: userQuery } = userValidation.getUsers.validate(request.params);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const { data, totalCounts } = await userService.getUsers(userQuery);
  /* Return */
  return responseUtils.buildPagingResponse(response, { totalCounts, data });
};

const getUser = async (request, response) => {
  /* Query */
  const user = await userService.getUser(request.params.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: user });
};

const createUser = async (request, response) => {
  /* Validate */
  const { error, value: model } = userValidation.createUser.validate(request.body);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const user = await userService.createUser(model);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: user });
};

const updateUser = async (request, response) => {
  /* Validate */
  const { error, value: model } = userValidation.updateUser.validate(request.body);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const user = await userService.updateUser(model, request.params.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: user });
};

const deleteUser = async (request, response) => {
  /* Execute */
  const user = await userService.deleteUser(request.params.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: user });
};

const loginUser = async (request, response) => {
  /* Validate */
  const { error, value: model } = userValidation.loginUser.validate(request.body);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const user = await userService.loginUser(model);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: user });
};

const getToken = async (request, response) => {
  /* Validate */
  if (!request.header('Authorization')) {
    throw new UnauthorizedError(null, 'Unauthorized');
  }

  const token = request.header('Authorization').replace(`${jwtConfiguration.tokenType} `, '');
  /* Execute */
  const user = await userService.getToken(token);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: user });
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getToken,
};
