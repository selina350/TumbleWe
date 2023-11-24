import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//action creation by thunk
export const getAllSteps = (appId) => async (dispatch) => {
  try {
    const response = await axios(`/api/applications/${appId}/steps`);
    const { data } = response;
    const payload = data.steps.reduce((obj, step) => {
      obj[step.id] = step;
      return obj;
    }, {});
    dispatch(fetchStepSuccess(data.steps));
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

export const createStep =
  (appId, name, url, selector, type) => async (dispatch) => {
    try {
      const response = await axios.post(`/api/applications/${appId}/steps`, {
        name,
        url,
        selector,
        type,
      });
      const { data } = response;
      console.log(data);
      dispatch(fetchStepSuccess([data]));
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
          return "An error occurred. Please try again.";
        }
      }
    }
  };

export const editStep = (step) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/steps/${step.id}`, step);
    const { data } = response;
    dispatch(fetchStepSuccess([data]));
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

export const deleteStep = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/steps/${id}`);
    const { data } = response;
    dispatch(deleteStepSuccess({ id }));
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
        return formattedErrors;
      } else {
        return ["An error occurred. Please try again."];
      }
    }
  }
};
const stepSlice = createSlice({
  name: "step",
  initialState: { fetchPending: true },
  reducers: {
    fetchStepSuccess(state, action) {
      state.fetchPending = false;
      action.payload.forEach((step) => {
        state[step.id] = step;
      });
    },
    deleteStepSuccess(state, action) {
      delete state[action.payload.id];
    },
  },
});

export const { fetchStepSuccess, deleteStepSuccess } = stepSlice.actions;
export default stepSlice.reducer;
