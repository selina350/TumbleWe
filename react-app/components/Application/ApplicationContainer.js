import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllApps, editApp } from "../../redux/model/applicationSlice";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FileManageContainer from "../File/FileManageContainer";
import PublicIcon from "@mui/icons-material/Public";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import StepTable from "../Step/StepTable";
import ApplicationMockAPIContainer from "./ApplicationMockAPIContainer";

const ApplicationContainer = ({ tab }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [shouldShowEdit, setShouldShowEdit] = useState(false);
  const [nameError, setNameError] = useState(null);
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
    //hit enter on keyboard
    if (event.keyCode == 13) {
      if (name.length > 0) {
        const errors = await dispatch(editApp(id, name));
        if (errors && errors.name) {
          setNameError(errors.name);
        } else {
          setIsEditingName(false);
        }
      } else {
        setIsEditingName(false);
      }
    }
  };

  const handleSwitchTab = (tab) => {
    if (tab === 0) {
      navigate(`/application/${id}`);
    } else if (tab === 1) {
      navigate(`/application/${id}/steps`);
    } else if (tab === 2) {
      navigate(`/application/${id}/mock-api`);
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
              <Tooltip
                title="This application means your web app. You can view it by click the link below. Upload Files to support your application e.g. index.html. Steps are the user events simulated on your web app once it's loaded."
                arrow
              >
                <IconButton color="primary" disableRipple>
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
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
                    setNameError(null);
                  }}
                  onBlur={() => setIsEditingName(false)}
                  onKeyDown={handleNameInputKeyDown}
                  fullWidth
                  autoFocus
                />
              </ClickAwayListener>
              {nameError !== null && (
                <div className="error-msg">{nameError}</div>
              )}
            </Grid>
          )}
          <Grid item>
            <a href={`//${viewAppUrl}`}>{viewAppUrl}</a>
            <IconButton
              size="small"
              href={`//${viewAppUrl}`}
              color="primary"
              target="_blank"
            >
              <OpenInNewIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Tabs value={tab} onChange={(event, tab) => handleSwitchTab(tab)}>
            <Tab value={0} label="Files" />
            <Tab value={1} label="Steps" />
            <Tab value={2} label="Mock API" />
          </Tabs>
          <Divider />
        </Grid>
        <Grid item>
          {tab === 0 && <FileManageContainer />}
          {tab === 1 && <StepTable />}
          {tab === 2 && <ApplicationMockAPIContainer />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplicationContainer;
