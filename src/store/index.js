import { createStore, applyMiddleware } from "redux";
import allReducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reduxPromiseMiddleware from "redux-promise-middleware";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas";

//logger
var logger = createLogger();

//saga
let saga = createSagaMiddleware();

//middleware
let middleware = [ reduxThunk, saga, reduxPromiseMiddleware, logger ];

//store
var store = createStore(allReducers, {}, composeWithDevTools(applyMiddleware(...middleware)));

//invoke root saga
saga.run(rootSaga);

export default store;
