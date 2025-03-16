import { configureStore } from '@reduxjs/toolkit'
import downloadsReducer from './slices/downloadsSlice'
import userReducer from './slices/user'
import modpacksReducer from './slices/modpacks'
import { listenerMiddleware } from '../middleware/listeners'

export const store = configureStore({
  reducer: {
    downloads: downloadsReducer,
    user: userReducer,
    modpacks: modpacksReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
