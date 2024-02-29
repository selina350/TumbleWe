import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMockApis,
  createMockApi,
  editMockApi,
} from "../../../redux/model/mockApiSlice";
import { displayAlert } from "../../../redux/controller/alertSlice";
import { useNavigate, useParams } from "react-router-dom";

const MockAPIForm = ({ apiId }) => {
  const { id } = useParams();
  const api = useSelector((state) => state.model.mockApis[apiId]);

  const [method, setMethod] = useState(api?.method || "GET");
  const [path, setPath] = useState(api?.path || "");
  const [pathError, setPathError] = useState(null);
  const [responseType, setResponseType] = useState(api?.responseType || "JSON");
  const [responseBody, setResponseBody] = useState(api?.responseBody || "");
  const [responseBodyError, setResponseBodyError] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllMockApis(id));
  }, [dispatch]);

  useEffect(() => {
    if (api !== undefined) {
      setMethod(api.method);
      setPath(api.path);
      setResponseType(api.responseType);
      setResponseBody(api.responseBody);
    }
  }, [api]);

  useEffect(() => {
    setIsSubmitDisabled(pathError || responseBodyError);
  }, [method, path, responseBody, responseType, pathError, responseBodyError]);

  useEffect(() => {
    if (api === undefined) {
      setIsSubmitDisabled(true);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    pathInputValidation(path);
    responseBodyInputValidation(responseBody);

    if (pathError || responseBodyError) {
      return;
    }
    let errors;
    if (apiId !== undefined) {
      //editing
      errors = await dispatch(
        editMockApi({
          id: apiId,
          applicationId: id,
          method,
          path,
          responseType,
          responseBody,
        })
      );
    } else {
      //creation
      errors = await dispatch(
        createMockApi(id, method, path, responseType,responseBody)
      );
    }

    if (!errors) {
      dispatch(
        displayAlert(apiId !== undefined ? "Api Edited" : "Api Created")
      );
      setMethod("GET");
      setPath("");
      setResponseType("JSON");
      setResponseBody("");
      navigate(`/application/${id}/mockApis`);
    } else {
      // Handle errors - API call encountered validation errors or other issues
      console.error("Error creating api:", errors);
      // You can display error messages to the user or handle them as needed.
    }
  };

  const pathInputValidation = (checkPath) => {
    if (checkPath === undefined || checkPath.length === 0) {
      setPathError("Path is required.");
    } else if (checkPath.length > 255) {
      setPathError("Path is too long.");
    } else {
      setPathError(null);
    }
  };

  const responseBodyInputValidation = (checkBody) => {
    if (checkBody === "") {
      setResponseBodyError("Response body is required.");
    } else {
      setResponseBodyError(null);
    }
  };

  const isEdit = apiId !== undefined;
  return (
    <>
      <Box sx={{ minWidth: 400, padding: 2 }}>
        <FormControl fullWidth>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h6">
                {isEdit ? "Edit" : "Create"} Mock API
              </Typography>
            </Grid>
            <Grid item container direction="column">
              <Grid item>
                <Typography id="mockapi-form-method-label" variant="body2">
                  Method
                </Typography>
              </Grid>
              <Grid item>
                <Select
                  labelId="mockapi-form-method-label"
                  select
                  fullWidth
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <MenuItem value={"GET"}>GET</MenuItem>
                  <MenuItem value={"POST"}>POST</MenuItem>
                  <MenuItem value={"PUT"}>PUT</MenuItem>
                  <MenuItem value={"DELETE"}>DELETE</MenuItem>
                  <MenuItem value={"OPTIONS"}>OPTIONS</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid item container direction="column">
              <Grid item container direction="row">
                <Grid item xs>
                  <Typography id="mockapi-form-path-label" variant="body2">
                    Path e.g. "/api/my-path"
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="GrayText" variant="body2">
                    Required
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <TextField onChange={(e) => setPath(e.target.value)} fullWidth />
              </Grid>
            </Grid>
            <Grid item container direction="column">
              <Grid item>
                <Typography id="mockapi-form-method-label" variant="body2">
                  Response Type
                </Typography>
              </Grid>
              <Grid item>
                <Select onChange={(e) => setResponseType(e.target.value)}labelId="mockapi-form-method-label" select fullWidth>
                  <MenuItem value={"TEXT"}>Text</MenuItem>
                  <MenuItem value={"JSON"}>Json</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid item container direction="column">
              <Grid item xs>
                <Typography id="mockapi-form-path-label" variant="body2">
                  Response Body
                </Typography>
              </Grid>
              <Grid item>
                <TextField onChange={(e) => setResponseBody(e.target.value)} multiline minRows={4} maxRows={10} fullWidth />
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={1}>
              <Grid item>
                <Button variant="outlined">Cancel</Button>
              </Grid>
              <Grid item>
                <Button onClick={submitHandler} variant="contained">
                  {isEdit ? "Confirm" : "Create"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </>
  );
};

export default MockAPIForm;
