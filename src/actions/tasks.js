import * as actionTypes from "../constants/action-types";

//FETCH_TASKS_PENDING
//FETCH_TASKS_FULFILLED
//FETCH_TASKS_REJECTED
export const fetchTasks = () => ({
  type: actionTypes.FETCH_TASKS,
});

export const createTask = (newTask) => ({
  type: actionTypes.CREATE_TASK,
  payload: newTask,
});

export const deleteTask = (taskId) => ({
  type: actionTypes.DELETE_TASK,
  payload: taskId,
});

export const cancelFetchTasks = () => ({
  type: actionTypes.FETCH_TASKS_CANCEL,
});
