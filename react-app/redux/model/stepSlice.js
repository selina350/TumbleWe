import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { sortSteps } from "../../utils/stepHelper";
import request from "../request";

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
  (appId, name, selector, type, innerHTML) => async (dispatch, getState) => {
    const steps = Object.values(getState().model.steps).filter((value) => {
      return typeof value !== "boolean" && value.applicationId + "" === appId;
    });
    const sortedSteps = sortSteps(steps);
    //calculate the order of this newly created step
    const order = Math.max(
      sortedSteps.length + 1,
      sortedSteps.pop()?.order || 0 + 1
    );
    try {
      const response = await axios.post(`/api/applications/${appId}/steps`, {
        name,
        selector,
        type,
        innerHTML,
        order,
      });
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

export const changeStepOrder =
  (targetIndex, stepId, appId) => async (dispatch, getState) => {
    const steps = Object.values(getState().model.steps).filter((value) => {
      return typeof value !== "boolean" && value.applicationId + "" === appId;
    });
    const sortedSteps = sortSteps(steps);
    const newSortedSteps = [];
    const movingStep = sortedSteps.find((step) => step.id === stepId);
    const filteredSteps = sortedSteps.filter((step) => step.id !== stepId);
    filteredSteps.forEach((step, index) => {
      if (index === targetIndex) {
        newSortedSteps.push(movingStep);
      }
      newSortedSteps.push(step);
    });
    if (targetIndex === filteredSteps.length) {
      newSortedSteps.push(movingStep);
    }
    //add order value to each steps
    const payload = newSortedSteps.map((step, index) => {
      return { ...step, order: index };
    });
    try {
      const response = await axios.put(
        `/api/applications/${appId}/steps/order`,
        payload.map((step) => ({ id: step.id, order: step.order }))
      );
      const { data } = response;
    } catch (e) {}

    dispatch(fetchStepSuccess(payload));
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

const { fetchStepSuccess, deleteStepSuccess } = stepSlice.actions;
export default stepSlice.reducer;
