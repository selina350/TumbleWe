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
import React from "react";

const MockAPIForm = ({ apiId }) => {
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
                <Select labelId="mockapi-form-method-label" select fullWidth>
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
                <TextField fullWidth />
              </Grid>
            </Grid>
            <Grid item container direction="column">
              <Grid item>
                <Typography id="mockapi-form-method-label" variant="body2">
                  Response Type
                </Typography>
              </Grid>
              <Grid item>
                <Select labelId="mockapi-form-method-label" select fullWidth>
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
                <TextField multiline minRows={4} maxRows={10} fullWidth />
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={1}>
              <Grid item>
                <Button variant="outlined">Cancel</Button>
              </Grid>
              <Grid item>
                <Button variant="contained">
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
