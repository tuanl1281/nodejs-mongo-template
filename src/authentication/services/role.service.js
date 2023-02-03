import ServiceError from '@app/errors/service.error';
import { Role } from 'authentication/models';

/**
 * Create a task
 * @param {Object} model
 * @returns {Promise<Role>}
 */
const createRole = (model) => {
  return Role.create(model);
};

/**
 * Update a task
 * @param {Object} model
 * @param {ObjectId} id
 * @returns {Promise<Role>}
 */
const updateRole = async (model, id) => {
  // #region --- Validate ---
  const task = await Role.findById(id);
  if (!task) {
    throw new ServiceError(null, "Role isn't existed");
  }
  // #endregion

  /* Builder */
  Object.assign(task, model);
  /* Save */
  await task.save();
  /* Return */
  return task;
};

/**
 * Delete a task
 * @param {ObjectId} id
 * @returns {Promise<Role>}
 */
const deleteRole = async (id) => {
  // #region --- Validate ---
  const task = await Role.findById(id);
  if (!task) {
    throw new ServiceError(null, "Role isn't existed");
  }
  // #endregion

  /* Save */
  await task.remove();
  /* Return */
  return task;
};

/**
 * Get task by id
 * @param {ObjectId} id
 * @returns {Promise<Role>}
 */
const getRole = async (id) => {
  /* Return */
  return Role.findById(id);
};

/**
 * Get tasks
 * @returns {Promise<List<Role>>}
 */
const getRoles = async ({ pageIndex, pageSize, ...query }) => {
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

  const result = await Role.paginate(query, options);
  /* Return */
  return result;
};

export default {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
