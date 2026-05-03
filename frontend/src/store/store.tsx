import { configureStore } from '@reduxjs/toolkit'
import keyWordReducer from './slice/language/KeyWord'
import permisstionReducer from './slice/permisstion/Permisstion'
import mutationsPostSlice from './Apis/Mutations/mutationsPostSlice'
import {querySlice} from "./Apis/Queries/queriesSlice"
import SearchReducer from './slice/search/search'
import { shearQuery } from './Apis/Queries/shearQuery'

export const store = configureStore({
  reducer: {
    keyWord: keyWordReducer,
    search: SearchReducer,
    permisstion: permisstionReducer,
    [querySlice.reducerPath]:querySlice.reducer,
    [shearQuery.reducerPath]:shearQuery.reducer,
    
    [mutationsPostSlice.reducerPath]: mutationsPostSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mutationsPostSlice.middleware)
    .concat(querySlice.middleware).concat(shearQuery.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
