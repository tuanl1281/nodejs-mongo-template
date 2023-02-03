import ServiceError from '@app/errors/service.error';
import { Permission } from 'authentication/models';

/**
 * Create a permission
 * @param {Object} model
 * @returns {Promise<Permission>}
 */
const createPermission = (model) => {
  return Permission.create(model);
};

/**
 * Update a permission
 * @param {Object} model
 * @param {ObjectId} id
 * @returns {Promise<Permission>}
 */
const updatePermission = async (model, id) => {
  // #region --- Validate ---
  const permission = await Permission.findById(id);
  if (!permission) {
    throw new ServiceError(null, "Permission isn't existed");
  }
  // #endregion

  /* Builder */
  Object.assign(permission, model);
  /* Save */
  await permission.save();
  /* Return */
  return permission;
};

/**
 * Delete a permission
 * @param {ObjectId} id
 * @returns {Promise<Permission>}
 */
const deletePermission = async (id) => {
  // #region --- Validate ---
  const permission = await Permission.findById(id);
  if (!permission) {
    throw new ServiceError(null, "Permission isn't existed");
  }
  // #endregion

  /* Save */
  await permission.remove();
  /* Return */
  return permission;
};

/**
 * Get permission by id
 * @param {ObjectId} id
 * @returns {Promise<Permission>}
 */
const getPermission = async (id) => {
  /* Return */
  return Permission.findById(id);
};

/**
 * Get permissions
 * @returns {Promise<List<Permission>>}
 */
const getPermissions = async ({ pageIndex, pageSize, ...query }) => {
  /* Query */
  const options = {
    offset: pageIndex,
    limit: pageSize,
    customLabels: {
      docs: 'data',
      totalDocs: 'totalCounts',
      limit: 'pageSize',
      offset: 'pageIndex',
    },
  };

  const result = await Permission.paginate(query, options);
  /* Return */
  return result;
};

export default {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
};
