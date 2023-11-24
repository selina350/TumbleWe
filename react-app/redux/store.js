import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./controller/userSlice";
import applicationReducer from "./model/applicationSlice";
import fileReducer from "./model/fileSlice";
import stepReducer from "./model/stepSlice";

import logger from "redux-logger";

const controller = combineReducers({
  user: usersReducer,
});
const model = combineReducers({
  applications: applicationReducer,
  files: fileReducer,
  steps: stepReducer,
});
export default configureStore({
  reducer: {
    controller,
    model,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
