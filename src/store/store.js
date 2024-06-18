import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authReducer'
import courseReducer from './slice/courseReducer'
import uploadReducer from './slice/uploadReducer'
import {thunk} from 'redux-thunk'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    course:courseReducer,
    upload:uploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
})
