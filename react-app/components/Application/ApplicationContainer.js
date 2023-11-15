import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Divider, Grid, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import {
  getAllApps,
  createApp,
  editApp,
} from "../../redux/model/applicationSlice";
import FileManageContainer from '../File/FileManageContainer'
import PublicIcon from '@mui/icons-material/Public'

const ApplicationContainer = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const applications = useSelector((state) => state.model.applications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllApps());
  }, [dispatch]);

  useEffect(() => {
    if (applications.fetchPending === false && applications[id]) {
      setName(applications[id].name);
    }
  }, [id, applications]);

  if (applications.fetchPending) {
    return <div>Loading...</div>;
  }
  const currentApplication = applications[id];
  const handleSave = () => {
    let newName = name
    if(name.length === 0){
      newName = currentApplication.name
    }
    dispatch(editApp(id, newName));
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item container spacing={2}>
          <Grid item>
            <PublicIcon color="disabled"/>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" textTransform="uppercase">
              Application
            </Typography>
            <div><a href={`//${location.host.replace('www', 'app')}`}>{location.host.replace('www', 'app')}</a></div>
          </Grid>
        </Grid>
        <Grid item>
          <Divider/>
        </Grid>
        <Grid item container alignItems="flex-start">
          <Grid item xs={12} md={2}>
            Name:
          </Grid>
          <Grid item xs>
            <TextField
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              onBlur={handleSave}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item container alignItems="flex-start">
          <Grid item xs={12} md={2}>
            Files:
          </Grid>
          <Grid item xs>
            <FileManageContainer/>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplicationContainer;
