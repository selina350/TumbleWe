import React, { useEffect, useState } from "react";
import ApplicationCard from "./ApplicationCard";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createApp,
  deleteApp,
  getAllApps,
} from "../../redux/model/applicationSlice";
import { displayConfirmation } from "../../redux/controller/confirmationSlice";

const ApplicationList = ({ applications }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClick = (event, appId) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(appId);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleDeleteApplication = async () => {
    await dispatch(
      displayConfirmation({
        message: "Are you sure about deleting this app?",
        onConfirm: () => {
          dispatch(deleteApp(selectedId));
        },
      })
    );
    setAnchorEl(null);
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(createApp());
      navigate(`/application/${data.id}`);
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {applications.map((app) => {
          return (
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
              <ApplicationCard
                application={app}
                onMenuClick={handleMenuClick}
              />
            </Grid>
          );
        })}
        <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
          <Card sx={{ minWidth: 200 }} onClick={handleSumbit}>
            <CardActionArea>
              <CardContent sx={{ minHeight: 150, display: "flex" }}>
                <Grid container direction="column">
                  <Grid item>
                    {" "}
                    <AddIcon />{" "}
                  </Grid>
                  <Grid item xs>
                    {" "}
                  </Grid>
                  <Grid item>
                    <Typography>
                      {/* <Button component={Link} to="/login" color="inherit">New Application</Button> */}
                      New Application
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleCloseMenu}>
        <MenuItem onClick={handleDeleteApplication}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default ApplicationList;
