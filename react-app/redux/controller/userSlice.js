import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import request from "../request";

//action creation by thunk
export const fetchUser = () => async (dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const response = await request.get("/api/users/me");
    dispatch(fetchUserSuccess(response.data));
  } catch (e) {}
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });
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

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/auth/logout");
    dispatch(logoutSuccess());
  } catch (e) {}
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

export const editUser =
  (username, oldPassword, newPassword) => async (dispatch) => {
    try {
      const response = await axios.put("/api/users/me", {
        username,
        oldPassword,
        newPassword,
      });
      const { data } = response;
      dispatch(fetchUserSuccess(data));
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

export const deleteUser = () => async (dispatch) => {
  try {
    const response = await axios.delete("/api/users/me");
    dispatch(logoutSuccess());
  } catch (e) {
    console.log(e);
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
    fetchUserRequest(state, action) {
      state.fetchPending = true;
      return state;
    },
    fetchUserSuccess(state, action) {
      state.fetchPending = false;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      return state;
    },
    logoutSuccess(state, action) {
      state = {};
      state.fetchPending = false;
      return state;
    },
  },
});

const { fetchUserRequest, fetchUserSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
