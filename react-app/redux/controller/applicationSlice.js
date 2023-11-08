import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//action creation by thunk
export const fetchApplication = () => async (dispatch) => {
  dispatch(fetchApplicationRequest());
  const response = await axios("/api/users/me");
  dispatch(fetchUserSuccess(response.data));
};

export const getAllApplications = () => async (dispatch) => {
  try {
    const response = await axios("/api/applications")
    const { data } = response;
    dispatch(fetchUserSuccess(data));
  } catch (e) {
    console.log(e);
    const { response } = e;
    if (response.status < 500) {
      const { data } = response;
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  }
};

export const signUp = (email, username, password) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth/signup", {
      email,
      username,
      password,
    });
    const { data } = response;
    dispatch(fetchUserSuccess(data));
    return null;
  } catch (e) {
    const { response } = e;
    if (response.status < 500) {
      const { data } = response;

      if (data.errors) {
        const formattedErrors = {};
        for (const err of data.errors) {
          const splitErr = err.split(" : ");
          formattedErrors[splitErr[0]] = splitErr[1];
        }
        return formattedErrors;
      } else {
        return ["An error occurred. Please try again."];
      }
    }
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: { fetchPending: true },
  reducers: {
    fetchApplicationRequest(state, action) {
      state.fetchPending = true;
    },
    fetchUserSuccess(state, action) {
      state.fetchPending = false;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email
    },
  },
});

export const { fetchApplicationRequest, fetchUserSuccess } = userSlice.actions;
export default userSlice.reducer;
