import { jwt as jwtConfiguration } from '@app/configurations';
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
  /* Execute */
  const token = request.header('Authorization').replace(`${jwtConfiguration.tokenType} `, '');
  const user = await userService.getToken(token);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: user });
};

const getInformation = async (request, response) => {
  /* Query */
  const user = await userService.getUser(response.locals.user.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: user });
};

const addPermissions = async (request, response) => {
  /* Validate */
  const { error, value: model } = userValidation.addPermissions.validate(request.body);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const role = await userService.addPermissions(model, request.params.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: role });
};

const removePermissions = async (request, response) => {
  /* Validate */
  const { error, value: model } = userValidation.removePermissions.validate(request.body);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const role = await userService.removePermissions(model, request.params.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: role });
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getToken,
  getInformation,
  addPermissions,
  removePermissions,
};
