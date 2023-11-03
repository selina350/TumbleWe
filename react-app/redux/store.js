import { configureStore, combineReducers } from '@reduxjs/toolkit'
import usersReducer from './controller/userSlice'
import logger from 'redux-logger'

const controller = combineReducers({
    user: usersReducer,
})
const model = combineReducers({
})
export default configureStore({
  reducer: {
    controller,
    // model
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})