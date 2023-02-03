import ServiceError from '@app/errors/service.error';
import { Permission } from 'authentication/models';

/**
 * Create a task
 * @param {Object} model
 * @returns {Promise<Permission>}
 */
const createPermission = (model) => {
  return Permission.create(model);
};

/**
 * Update a task
 * @param {Object} model
 * @param {ObjectId} id
 * @returns {Promise<Permission>}
 */
const updatePermission = async (model, id) => {
  // #region --- Validate ---
  const task = await getPermission(id);
  if (!task) {
    throw new ServiceError(null, "Permission isn't existed");
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
 * @returns {Promise<Permission>}
 */
const deletePermission = async (id) => {
  // #region --- Validate ---
  const task = await getPermission(id);
  if (!task) {
    throw new ServiceError(null, "Permission isn't existed");
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
 * @returns {Promise<Permission>}
 */
const getPermission = async (id) => {
  /* Return */
  return Permission.findById(id);
};

/**
 * Get tasks
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
