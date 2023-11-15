import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import request from '../request'

//action creation by thunk
export const getAllApps = () => async (dispatch) => {
  try {
    const response = await request.get("/api/applications");
    const { data } = response;
    dispatch(fetchApplicationSuccess(data.applications));
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

export const createApp = () => async (dispatch) => {
  const name = new Date().getTime().toString(32);
  try {
    const response = await axios.post("/api/applications", {
      name,
    });
    const { data } = response;
    console.log(data);
    dispatch(fetchApplicationSuccess([data]));
    return data;
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
        throw Error(formattedErrors);
      } else {
        throw Error(["An error occurred. Please try again."]);
      }
    }
  }
};

export const editApp = (id, name) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/applications/${id}`, {
      name,
    });
    const { data } = response;
    console.log(data);
    dispatch(fetchApplicationSuccess([data]));
    return data;
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
        throw Error(formattedErrors);
      } else {
        throw Error(["An error occurred. Please try again."]);
      }
    }
  }
};

export const deleteApp = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/applications/${id}`);
    const { data } = response;
    dispatch(deleteApplicationSuccess({ id }));
    return data;
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
        throw Error(formattedErrors);
      } else {
        throw Error(["An error occurred. Please try again."]);
      }
    }
  }
};
const applicationSlice = createSlice({
  name: "application",
  initialState: { fetchPending: true },
  reducers: {
    fetchApplicationSuccess(state, action) {
      state.fetchPending = false;
      action.payload.forEach((app) => {
        state[app.id] = app;
      });
    },
    deleteApplicationSuccess(state, action) {
      delete state[action.payload.id];
    },
  },
});

export const { fetchApplicationSuccess, deleteApplicationSuccess } =
  applicationSlice.actions;
export default applicationSlice.reducer;
