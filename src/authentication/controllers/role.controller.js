import { responseUtils } from '@app/utils';
import { roleService } from 'authentication/services';
import { roleValidation } from 'authentication/validations';
import { getValidationError } from '@app/utils/error.util';

const getRoles = async (request, response) => {
  /* Validate */
  const { error, value: roleQuery } = roleValidation.getRoles.validate(request.params);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const { data, totalCounts } = await roleService.getRoles(roleQuery);
  /* Return */
  return responseUtils.buildPagingResponse(response, { totalCounts, data });
};

const getRole = async (request, response) => {
  /* Query */
  const role = await roleService.getRole(request.params.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: role });
};

const createRole = async (request, response) => {
  /* Validate */
  const { error, value: model } = roleValidation.createRole.validate(request.body);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const role = await roleService.createRole(model);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: role });
};

const updateRole = async (request, response) => {
  /* Validate */
  const { error, value: model } = roleValidation.updateRole.validate(request.body);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const role = await roleService.updateRole(model, request.params.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: role });
};

const deleteRole = async (request, response) => {
  /* Execute */
  const role = await roleService.deleteRole(request.params.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: role });
};

export default {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
