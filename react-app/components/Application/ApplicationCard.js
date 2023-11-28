import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const ApplicationCard = ({ application, onMenuClick }) => {
  const handleMenuClick = (event) => {
    event.preventDefault();
    onMenuClick(event, application.id);
  };

  const timeAgo = formatDistanceToNow(new Date(application.createdAt), {
    addSuffix: true,
  });
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardActionArea
        LinkComponent={Link}
        to={`/application/${application.id}`}
      >
        <CardContent sx={{ minHeight: 150, display: "flex" }}>
          <Grid container direction="column">
            <Grid item xs alignItems="center" container spacing={2}>
              <Grid item>
                <PublicIcon edge="start" color="primary" />
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle1">{application.name}</Typography>
              </Grid>
              <Grid item>
                <IconButton edge="end" onClick={handleMenuClick}>
                  <MoreVertIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs></Grid>
            <Grid item>
              <Chip label={`created ${timeAgo}`} size="small" />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ApplicationCard;
