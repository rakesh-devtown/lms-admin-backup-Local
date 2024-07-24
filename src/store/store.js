import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authReducer'
import courseReducer from './slice/courseReducer'
import uploadReducer from './slice/uploadReducer'
import requestReducer from './slice/requestReducer'
import annnouncementReducer from './slice/announcementReducer'
import {thunk} from 'redux-thunk'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    course:courseReducer,
    upload:uploadReducer,
    request:requestReducer,
    annnouncement:annnouncementReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
})
