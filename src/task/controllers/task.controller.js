import { responseUtils } from '@app/utils';
import { taskService } from 'task/services';
import { taskValidation } from 'task/validations';
import { getValidationError } from '@app/utils/error.util';

const getTasks = async (request, response, next) => {
  /* Validate */
  const { error, value: taskQuery } = taskValidation.getTasks.validate(request.params);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const { data, totalCounts } = await taskService.getTasks(taskQuery);
  /* Return */
  return responseUtils.buildPagingResponse(response, { totalCounts, data });
};

const getTask = async (request, response, next) => {
  /* Query */
  const task = await taskService.getTask(request.params.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: task });
};

const createTask = async (request, response, next) => {
  /* Validate */
  const { error, value: model } = taskValidation.createTask.validate(request.body);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const task = await taskService.createTask(model);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: task });
};

const updateTask = async (request, response, next) => {
  /* Validate */
  const { error, value: model } = taskValidation.updateTask.validate(request.body);
  if (error) {
    throw getValidationError(error);
  }
  /* Execute */
  const task = await taskService.updateTask(model, request.params.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: task });
};

const deleteTask = async (request, response, next) => {
  /* Execute */
  const task = await taskService.deleteTask(request.params.id);
  /* Return */
  return responseUtils.buildResultResponse(response, { data: task });
};

export default {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
}
