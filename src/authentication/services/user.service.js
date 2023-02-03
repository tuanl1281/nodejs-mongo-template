import ServiceError from '@app/errors/service.error';
import { objectUtils } from '@app/utils';
import { User } from 'authentication/models';

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
  const user = await User.findById(id);
  /* Return */
  return objectUtils.picker(user, ['id', 'name', 'username']);
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

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
