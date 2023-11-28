import React, { useEffect } from "react";
import ApplicationList from "../Application/ApplicationList";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllApps } from "../../redux/model/applicationSlice";
import { useNavigate } from "react-router-dom";

const applicationsMockData = [];
const HomeContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const applicationsObj = useSelector((state) => state.model.applications);
  const user = useSelector((state) => state.controller.user);
  const applications = Object.values(applicationsObj).filter(
    (value) => typeof value !== "boolean"
  );
  useEffect(() => {
    if (user.email) {
      dispatch(getAllApps());
    } else {
      navigate("/login");
    }
  }, [dispatch, user]);
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="h4">Applications</Typography>
        </Grid>
        <Grid item container>
          <ApplicationList applications={applications} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeContainer;
