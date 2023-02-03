import ServiceError from '@app/errors/service.error';
import Task from 'task/models/task.model';

/**
 * Create a task
 * @param {Object} model
 * @returns {Promise<Task>}
 */
const createTask = (model) => {
  return Task.create(model);
};

/**
 * Update a task
 * @param {Object} model
 * @param {ObjectId} id
 * @returns {Promise<Task>}
 */
const updateTask = async (model, id) => {
  // #region --- Validate ---
  const task = await Task.findById(id);
  if (!task) {
    throw new ServiceError(null, "Task isn't existed");
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
 * @returns {Promise<Task>}
 */
const deleteTask = async (id) => {
  // #region --- Validate ---
  const task = await Task.findById(id);
  if (!task) {
    throw new ServiceError(null, "Task isn't existed");
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
 * @returns {Promise<Task>}
 */
const getTask = async (id) => {
  /* Return */
  return Task.findById(id);
};

/**
 * Get tasks
 * @returns {Promise<List<Task>>}
 */
const getTasks = async ({ pageIndex, pageSize, ...query }) => {
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

  const result = await Task.paginate(query, options);
  /* Return */
  return result;
};

export default {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
