import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        pizzaSize: 'All'
    },
    reducers: {
        selectSizeFilter(state, action) {
            // handles all the logic
            // needs current state and action
            // action requires a type and possibly a payload
            // use switch?
        }
    }
})

export default filterSlice.reducer

export const {selectSizeFilter} = filterSlice.actions

  // takes current state and action -> calulates new state
  // click a size in component -> triggers reducer
  // action creator filters out every order that doesn't have the selected size
  // updated state only shows those orders with selected size
  // 'All' is the default state - every order is shown
  // switch? - 'All', 'S', 'M', 'L'