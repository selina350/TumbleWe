import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//action creation by thunk
export const getAllFiles = (appId) => async (dispatch) => {
  try {
    const response = await axios(`/api/applications/${appId}/files`);
    const { data } = response;
    const payload = data.files.reduce((obj, file) => {
      obj[file.id] = file;
      return obj;
    }, {});
    dispatch(fetchFileSuccess(data.files));
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

export const createFile = (appId, name, url) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/applications/${appId}/files`, {
      name,
      url,
    });
    const { data } = response;
    console.log(data);
    dispatch(fetchFileSuccess([data]));
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

export const editFile = (file, name, url) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/files/${file.id}`, {
      name,
      url,
    });
    const { data } = response;
    console.log(data);
    dispatch(fetchFileSuccess([data]));
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

export const deleteFile = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/files/${id}`);
    const { data } = response;
    dispatch(deleteFileSuccess({ id }));
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
const fileSlice = createSlice({
  name: "file",
  initialState: { fetchPending: true },
  reducers: {
    fetchFileSuccess(state, action) {
      state.fetchPending = false;
      action.payload.forEach((file) => {
        state[file.id] = file;
      });
    },
    deleteFileSuccess(state, action) {
      delete state[action.payload.id];
    },
  },
});

export const { fetchFileSuccess, deleteFileSuccess } = fileSlice.actions;
export default fileSlice.reducer;
