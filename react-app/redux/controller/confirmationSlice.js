import { createSlice } from "@reduxjs/toolkit";

const confirmationSlice = createSlice({
  name: "confirm",
  initialState: { open: false },
  reducers: {
    displayConfirmation(state, action) {
      state.message = action.payload.message;
      state.open = true;
      state.onConfirm = action.payload.onConfirm
      return state;
    },
    dismissConfirmation(state, action) {
      state.open = false;
      return state;
    },
  },
});

export const { displayConfirmation, dismissConfirmation } = confirmationSlice.actions;
export default confirmationSlice.reducer;
