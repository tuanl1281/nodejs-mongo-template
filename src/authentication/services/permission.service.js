import { objectUtils } from '@app/utils';
import { ServiceError } from '@app/errors';
import { User, Role, Permission } from 'authentication/models';

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

/**
 * Get permission by user id
 * @param {ObjectId} id
 * @returns {Promise<List<Permission>>}
 */
const getPermissionOfUser = async (id) => {
  const user = await User.findById(id).populate('permissionIds');
  if (!user) {
    return [];
  }

  /* Execute */
  const permissions = [];
  const roles = await Role.find().where('_id').in(user.roleIds).populate('permissionIds').exec();

  (user.permissionIds || []).forEach((permission) => {
    if (!permissions.find((_) => _.id.toString() === permission.id.toString())) {
      permissions.push(objectUtils.picker(permission, ['id', 'code', 'description']));
    }
  });

  (roles?.permissionIds ?? []).forEach((permission) => {
    if (!permissions.find((_) => _.id.toString() === permission.id.toString())) {
      permissions.push(objectUtils.picker(permission, ['id', 'code', 'description']));
    }
  });
  /* Return */
  return permissions;
};

/**
 * Get permission by role id
 * @param {ObjectId} id
 * @returns {Promise<List<Permission>>}
 */
const getPermissionOfRole = async (id) => {
  const role = await Role.findById(id).populate('permissionIds');
  if (!role) {
    return [];
  }

  /* Execute */
  const permissions = (role.permissionIds || []).forEach((permission) => {
    if (!permissions.find((_) => _.id.toString() === permission.id.toString())) {
      permissions.push(objectUtils.picker(permission, ['id', 'code', 'description']));
    }
  });
  /* Return */
  return permissions;
};

export default {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
  getPermissionOfUser,
  getPermissionOfRole,
};
