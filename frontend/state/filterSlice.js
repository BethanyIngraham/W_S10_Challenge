import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        pizzaSize: 'All'
    },
    reducers: {
        selectSizeFilter(state, action) {
           state.pizzaSize = action.payload
        }
    }
})

export default filterSlice.reducer

export const { 
    selectSizeFilter
} = filterSlice.actions
