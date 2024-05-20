import { configureStore } from '@reduxjs/toolkit'
import { pizzaApi } from './pizzaApi'
import filterSlice from './filterSlice'

const exampleReducer = (state = { count: 0 }) => {
  return state
}

export const resetStore = () => configureStore({

  reducer: {
    example: exampleReducer,
    filters: filterSlice,
    [pizzaApi.reducerPath]: pizzaApi.reducer
  },

  middleware: getDefault => 
    getDefault().concat(pizzaApi.middleware)
  
})

export const store = resetStore()
