import { ServiceError } from '@app/errors';
import { objectUtils } from '@app/utils';
import { User, Role, Permission } from 'authentication/models';

/**
 * Create a role
 * @param {Object} model
 * @returns {Promise<Role>}
 */
const createRole = async (model) => {
  const role = await Role.create(model);
  return objectUtils.picker(role, ['id', 'description']);
};

/**
 * Update a role
 * @param {Object} model
 * @param {ObjectId} id
 * @returns {Promise<Role>}
 */
const updateRole = async (model, id) => {
  // #region --- Validate ---
  const role = await Role.findById(id);
  if (!role) {
    throw new ServiceError(null, "Role isn't existed");
  }
  // #endregion

  /* Builder */
  Object.assign(role, model);
  /* Save */
  await role.save();
  /* Return */
  return objectUtils.picker(role, ['id', 'description']);
};

/**
 * Delete a role
 * @param {ObjectId} id
 * @returns {Promise<Role>}
 */
const deleteRole = async (id) => {
  // #region --- Validate ---
  const role = await Role.findById(id);
  if (!role) {
    throw new ServiceError(null, "Role isn't existed");
  }
  // #endregion

  /* Save */
  await role.remove();
  /* Return */
  return objectUtils.picker(role, ['id', 'description']);
};

/**
 * Get role by id
 * @param {ObjectId} id
 * @returns {Promise<Role>}
 */
const getRole = async (id) => {
  /* Query */
  const role = await Role.findById(id);
  /* Return */
  return objectUtils.picker(role, ['id', 'description']);
};

/**
 * Get roles
 * @returns {Promise<List<Role>>}
 */
const getRoles = async ({ pageIndex, pageSize, ...query }) => {
  /* Query */
  const options = {
    select: {
      description: 1,
    },
    offset: pageIndex,
    limit: pageSize,
    customLabels: {
      docs: 'data',
      totalDocs: 'totalCounts',
      limit: 'pageSize',
      offset: 'pageIndex',
    },
  };

  const result = await Role.paginate(query, options);
  /* Return */
  return result;
};

/**
 * Add user to role
 * @param {Object} model
 * @param {Array<ObjectId>} model.ids
 * @param {ObjectId} id
 * @returns {Promise<ObjectId>}
 */
const addUsers = async (model, id) => {
  // #region --- Validate ---
  const role = await Role.findById(id);
  if (!role) {
    throw new ServiceError(null, "Role isn't existed");
  }
  // #endregion

  /* Execute */
  const users = await User.find().where('_id').in(model.ids).exec();
  (users || []).forEach(async (user) => {
    /* Role */
    role.userIds.push(user.id);
    /* User */
    if (user) {
      user.roleIds = user.roleIds.filter((_) => _.toString() !== role.id.toString());
      user.roleIds.push(role.id);
      user.save();
    }
  });

  role.save();
  /* Return */
  return id;
};

/**
 * remove user of role
 * @param {Object} model
 * @param {Array<ObjectId>} model.ids
 * @param {ObjectId} id
 * @returns {Promise<ObjectId>}
 */
const removeUsers = async (model, id) => {
  // #region --- Validate ---
  const role = await Role.findById(id);
  if (!role) {
    throw new ServiceError(null, "Role isn't existed");
  }
  // #endregion

  /* Execute */
  const users = await User.find().where('_id').in(model.ids).exec();
  (users || []).forEach(async (user) => {
    /* Role */
    role.userIds = role.userIds.filter((_) => _.toString() !== user.id.toString());
    /* User */
    if (user) {
      user.roleIds = user.roleIds.filter((_) => _.toString() !== role.id.toString());
      user.save();
    }
  });

  role.save();
  /* Return */
  return id;
};

/**
 * add permission to role
 * @param {Object} model
 * @param {Array<ObjectId>} model.ids
 * @param {ObjectId} id
 * @returns {Promise<ObjectId>}
 */
const addPermissions = async (model, id) => {
  // #region --- Validate ---
  const role = await Role.findById(id);
  if (!role) {
    throw new ServiceError(null, "Role isn't existed");
  }
  // #endregion

  /* Execute */
  const permissions = await Permission.find().where('_id').in(model.ids).exec();
  (permissions || []).forEach((permission) => role.permissionIds.push(permission.id));

  role.save();
  /* Return */
  return id;
};

/**
 * remove permission of role
 * @param {Object} model
 * @param {Array<ObjectId>} model.ids
 * @param {ObjectId} id
 * @returns {Promise<ObjectId>}
 */
const removePermissions = async (model, id) => {
  // #region --- Validate ---
  const role = await Role.findById(id);
  if (!role) {
    throw new ServiceError(null, "Role isn't existed");
  }
  // #endregion

  /* Execute */
  const permissions = await Permission.find().where('_id').in(model.ids).exec();
  role.permissionIds = role.permissionIds.filter((_) => !permissions.find((__) => __.id.toString() === _.toString()));

  role.save();
  /* Return */
  return id;
};

export default {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
  addUsers,
  removeUsers,
  addPermissions,
  removePermissions,
};
