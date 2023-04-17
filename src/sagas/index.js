import {
  fetchTasksWorkerSaga,
  createTaskWorkerSaga,
  deleteTaskWorkerSaga,
} from "./tasks.js";
import {
  fork,
  takeEvery,
  takeLatest,
  throttle,
  all,
  take,
  cancel,
  put,
} from "redux-saga/effects";
import * as actionTypes from "../constants/action-types";

//fetch and cancel
export const fetchTasksWatcherSaga = function* () {
  while (yield take(actionTypes.FETCH_TASKS)) {
    let fetchProcess = yield fork(fetchTasksWorkerSaga);

    //cancel
    yield take(actionTypes.FETCH_TASKS_CANCEL);
    yield cancel(fetchProcess);

    yield put({
      type: actionTypes.FETCH_TASKS_REJECTED,
      payload: { message: "Cancelled" },
    });
  }
};

//receiving actions related to "tasks" table
export const tasksWatcherSaga = function* () {
  //yield fork(fetchTasksWatcherSaga);

  yield takeLatest(actionTypes.FETCH_TASKS, fetchTasksWorkerSaga);

  //send maximum only one request within 30 seconds
  yield throttle(1000 * 30, actionTypes.CREATE_TASK, createTaskWorkerSaga);

  //wait for CREATE_TASK; and then only proceed to the subsequent code
  yield take(actionTypes.CREATE_TASK);

  yield takeEvery(actionTypes.DELETE_TASK, deleteTaskWorkerSaga);
};

//receiving actions related to "employees" table
export const employeesWatcherSaga = function* () {};

export const rootSaga = function* () {
  console.log("rootSaga invoked");

  //run multiple watcher sagas in parallel
  yield all([fork(tasksWatcherSaga), fork(employeesWatcherSaga)]);
};
