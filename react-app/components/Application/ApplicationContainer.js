import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllApps,
  createApp,
  editApp,
} from "../../redux/model/applicationSlice";

import FileManageContainer from "../File/FileManageContainer";
import PublicIcon from "@mui/icons-material/Public";
import EditIcon from "@mui/icons-material/Edit";
import { Visibility } from "@mui/icons-material";
import StepTable from "../Step/StepTable";

const ApplicationContainer = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [shouldShowEdit, setShouldShowEdit] = useState(false);
  const [tab, setTab] = useState(0);
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

  const handleNameInputKeyDown = async (event) => {
    if (event.keyCode == 13) {
      if (name.length > 0) {
        await dispatch(editApp(id, name));
      }
      setIsEditingName(false);
    }
  };

  const viewAppUrl = location.host.replace("www", currentApplication.name);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container direction="column" gap={2}>
        <Grid item container direction="column">
          <Grid item container spacing={1} alignItems="end">
            <Grid item>
              <PublicIcon fontSize="small" />
            </Grid>
            <Grid item>
              <Typography variant="overline" textTransform="uppercase">
                Application
              </Typography>
            </Grid>
          </Grid>
          {!isEditingName && (
            <Grid
              item
              container
              onMouseEnter={() => setShouldShowEdit(true)}
              onMouseLeave={() => setShouldShowEdit(false)}
            >
              <Typography variant="h5" onClick={() => setIsEditingName(true)}>
                {currentApplication.name}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setIsEditingName(true)}
                sx={{ visibility: shouldShowEdit ? "visible" : "hidden" }}
              >
                <EditIcon />
              </IconButton>
            </Grid>
          )}
          {isEditingName === true && (
            <Grid item>
              <ClickAwayListener onClickAway={() => setIsEditingName(false)}>
                <TextField
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onBlur={() => setIsEditingName(false)}
                  onKeyDown={handleNameInputKeyDown}
                  fullWidth
                  autoFocus
                />
              </ClickAwayListener>
            </Grid>
          )}
          <Grid item>
            <a href={`//${viewAppUrl}`}>{viewAppUrl}</a>
          </Grid>
        </Grid>
        <Grid item>
          <Tabs value={tab} onChange={(event, tab) => setTab(tab)}>
            <Tab label="Files" />
            <Tab label="Steps" />
          </Tabs>
          <Divider />
        </Grid>
        <Grid item>
          {tab === 0 && <FileManageContainer />}
          {tab === 1 && <StepTable />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplicationContainer;
