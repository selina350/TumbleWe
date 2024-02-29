import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { sortSteps } from "../../utils/stepHelper";

//action creation by thunk
export const getAllMockApis = (appId) => async (dispatch) => {
  try {
    const response = await axios(`/api/applications/${appId}/mockApis`);
    const { data } = response;
    const payload = data.mockApis.reduce((obj, mockApi) => {
      obj[mockApi.id] = mockApi;
      return obj;
    }, {});
    dispatch(fetchMockApiSuccess(data.mockApis));
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

export const createMockApi =
  (appId, method, path, responseType, responseBody) =>
  async (dispatch, getState) => {
    const mockApis = Object.values(getState().model.mockApis).filter(
      (value) => {
        return typeof value !== "boolean" && value.applicationId + "" === appId;
      }
    );

    try {
      const response = await axios.post(`/api/applications/${appId}/mockApis`, {
        method,
        path,
        responseType,
        responseBody,
      });
      const { data } = response;

      dispatch(fetchMockApiSuccess([data]));
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

export const editMockApi = (mockApi) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/mockApis/${mockApi.id}`, mockApi);
    const { data } = response;
    dispatch(fetchMockApiSuccess([data]));
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

export const deleteMockApi= (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/mockApis/${id}`);
    const { data } = response;
    dispatch(deleteMockApiSuccess({ id }));
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

const mockApiSlice = createSlice({
  name: "mockApi",
  initialState: { fetchPending: true },
  reducers: {
    fetchMockApiSuccess(state, action) {
      state.fetchPending = false;
      action.payload.forEach((mockApi) => {
        state[mockApi.id] = mockApi;
      });
    },
    deleteMockApiSuccess(state, action) {
      delete state[action.payload.id];
    },
  },
});

const { fetchMockApiSuccess, deleteMockApiSuccess } = mockApiSlice.actions;
export default mockApiSlice.reducer;
