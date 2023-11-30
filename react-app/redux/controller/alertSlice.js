import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: { open: false },
  reducers: {
    displayAlert(state, action) {
      state.message = action.payload;
      state.open = true;
      return state;
    },
    dismissAlert(state, action) {
      state.open = false;
      return state;
    },
  },
});

export const { displayAlert, dismissAlert } = alertSlice.actions;
export default alertSlice.reducer;
