import React from 'react'
import ApplicationCard from './ApplicationCard'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const ApplicationList = ({ applications }) => {
  return (<Grid container spacing={2}>
      {applications.map(app => {
        return (
          <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
            <ApplicationCard application={app}/>
          </Grid>
        )
      })}
      <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
        <Card sx={{ minWidth: 200 }}>
          <CardActionArea>
            <CardContent sx={{minHeight: 150, display: 'flex'}}>
              <Grid container direction="column">
                <Grid item> <AddIcon/> </Grid>
                <Grid item xs> </Grid>
                <Grid item><Typography>
                  New Application
                </Typography></Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ApplicationList