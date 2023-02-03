import { responseUtils } from '@app/utils';
import { permissionService } from 'authentication/services';
import { permissionValidation } from 'authentication/validations';
import { getValidationError } from '@app/utils/error.util';

const getPermissions = async (request, response) => {
  /* Validate */
  const { error, value: permissionQuery } = permissionValidation.getPermissions.validate(request.params);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const { data, totalCounts } = await permissionService.getPermissions(permissionQuery);
  /* Return */
  return responseUtils.buildPagingResponse(response, { totalCounts, data });
};

const getPermission = async (request, response) => {
  /* Query */
  const permission = await permissionService.getPermission(request.params.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: permission });
};

const createPermission = async (request, response) => {
  /* Validate */
  const { error, value: model } = permissionValidation.createPermission.validate(request.body);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const permission = await permissionService.createPermission(model);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: permission });
};

const updatePermission = async (request, response) => {
  /* Validate */
  const { error, value: model } = permissionValidation.updatePermission.validate(request.body);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const permission = await permissionService.updatePermission(model, request.params.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: permission });
};

const deletePermission = async (request, response) => {
  /* Execute */
  const permission = await permissionService.deletePermission(request.params.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: permission });
};

export default {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
};
