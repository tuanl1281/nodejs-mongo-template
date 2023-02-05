import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { jwt as jwtConfiguration } from '@app/configurations';
import { ServiceError, UnauthorizedError } from '@app/errors';
import { timeUtils, objectUtils } from '@app/utils';
import { User, Permission } from 'authentication/models';
import { permissionService } from 'authentication/services';

/**
 * Create a user
 * @param {Object} model
 * @returns {Promise<User>}
 */
const createUser = async (model) => {
  const user = await User.create(model);
  return objectUtils.picker(user, ['id', 'name', 'username']);
};

/**
 * Update a user
 * @param {Object} model
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const updateUser = async (model, id) => {
  // #region --- Validate ---
  const user = await User.findById(id);
  if (!user) {
    throw new ServiceError(null, "User isn't existed");
  }
  // #endregion

  /* Builder */
  Object.assign(user, model);
  /* Save */
  await user.save();
  /* Return */
  return objectUtils.picker(user, ['id', 'name', 'username']);
};

/**
 * Delete a user
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deleteUser = async (id) => {
  // #region --- Validate ---
  const user = await User.findById(id);
  if (!user) {
    throw new ServiceError(null, "User isn't existed");
  }
  // #endregion

  /* Save */
  await user.remove();
  /* Return */
  return objectUtils.picker(user, ['id', 'name', 'username']);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUser = async (id) => {
  /* Query */
  const user = await User.findById(id);
  if (!user) {
    throw new ServiceError(null, "User isn't existed");
  }

  const permissionOfUser = await permissionService.getPermissionOfUser(user.id);
  /* Builder */
  const builder = {
    ...objectUtils.picker(user, ['id', 'name', 'username']),
    permissions: permissionOfUser,
  };
  /* Return */
  return builder;
};

/**
 * Get users
 * @returns {Promise<List<User>>}
 */
const getUsers = async ({ pageIndex, pageSize, ...query }) => {
  /* Query */
  const options = {
    select: {
      name: 1,
      username: 1,
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

  const result = await User.paginate(query, options);
  /* Return */
  return result;
};

/**
 * Login user
 * @param {Object} model
 * @param {String} model.username
 * @param {String} model.password
 * @returns {Promise<Object>}
 */
const loginUser = async (model) => {
  // #region --- Validate ---
  const user = await User.findOne({ username: model.username });
  if (!user) {
    throw new ServiceError(null, "User isn't existed");
  }

  if (!(await bcrypt.compare(model.password, user.password))) {
    throw new ServiceError(null, 'Login failed');
  }
  // #endregion

  /* Builder */
  const permissionOfUser = await permissionService.getPermissionOfUser(user.id);
  const token = jwt.sign({ userId: user.id, name: user.name, username: user.username }, jwtConfiguration.secret, {
    expiresIn: jwtConfiguration.tokenExpired,
  });

  const refreshToken = jwt.sign(
    { userId: user.id, name: user.name, username: user.username },
    jwtConfiguration.refreshSecret,
    { expiresIn: jwtConfiguration.refreshTokenExpired },
  );

  const result = {
    token,
    refreshToken,
    tokenType: jwtConfiguration.tokenType,
    expiresIn: timeUtils.getLocalDateTime().add(jwtConfiguration.tokenExpired, 'seconds'),
    userInfo: {
      ...objectUtils.picker(user, ['id', 'name', 'username']),
      permissions: permissionOfUser,
    },
  };
  /* Return */
  return result;
};

/**
 * Get token from refresh token
 * @param {String} refreshToken
 * @returns {Promise<Object>}
 */
const getToken = async (refreshToken) => {
  try {
    const claims = await jwt.verify(refreshToken, jwtConfiguration.refreshSecret);
    const token = jwt.sign(
      { userId: claims.userId, name: claims.name, username: claims.username },
      jwtConfiguration.secret,
      { expiresIn: jwtConfiguration.tokenExpired },
    );
    /* Return */
    return {
      token,
    };
  } catch (error) {
    throw new UnauthorizedError(null, 'Unauthorized');
  }
};

/**
 * add permission to user
 * @param {Object} model
 * @param {Array<ObjectId>} model.ids
 * @param {ObjectId} id
 * @returns {Promise<ObjectId>}
 */
const addPermissions = async (model, id) => {
  // #region --- Validate ---
  const user = await User.findById(id);
  if (!user) {
    throw new ServiceError(null, "User isn't existed");
  }
  // #endregion

  /* Execute */
  const permissions = await Permission.find().where('_id').in(model.ids).exec();
  (permissions || []).forEach((permission) => user.permissionIds.push(permission.id));

  user.save();
  /* Return */
  return id;
};

/**
 * remove permission of user
 * @param {Object} model
 * @param {Array<ObjectId>} model.ids
 * @param {ObjectId} id
 * @returns {Promise<ObjectId>}
 */
const removePermissions = async (model, id) => {
  // #region --- Validate ---
  const user = await User.findById(id);
  if (!user) {
    throw new ServiceError(null, "User isn't existed");
  }
  // #endregion

  /* Execute */
  const permissions = await Permission.find().where('_id').in(model.ids).exec();
  user.permissionIds = user.permissionIds.filter((_) => !permissions.find((__) => __.id.toString() === _.toString()));

  user.save();
  /* Return */
  return id;
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getToken,
  addPermissions,
  removePermissions,
};
