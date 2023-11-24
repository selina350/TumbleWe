export const DISPLAY_ALERT = "alert/DISPLAY_ALERT";
export const DISMISS_ALERT = "alert/DISMISS_ALERT";
import { createSlice } from "@reduxjs/toolkit";


const alertSlice = createSlice({
    name: "alert",
    initialState: { fetchPending: true },
    reducers: {
      displayAlert(state, action) {
        state.message = action.payload.message
      },
      dismissAlert(state, action) {
        delete state.message;
      },
    },
  });

  export const { displayAlert, dismissAlert } = alertSlice.actions;
  export default alertSlice.reducer;
