import React from "react";
import ApplicationCard from "./ApplicationCard";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createApp } from "../../redux/model/applicationSlice";

const ApplicationList = ({ applications }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <Grid container spacing={2}>
      {applications.map((app) => {
        return (
          <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
            <ApplicationCard application={app} />
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
  );
};

export default ApplicationList;
