import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import api from './middleware/api'
import persistReducer from './persist'
//import reducer from './reducer'

export default function store() {
  return configureStore({
    reducer: persistReducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
      api,
    ],
  })
}
