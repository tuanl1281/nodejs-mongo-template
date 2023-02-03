import { responseUtils } from '@app/utils';
import { userService } from 'authentication/services';
import { userValidation } from 'authentication/validations';
import { getValidationError } from '@app/utils/error.util';

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

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
