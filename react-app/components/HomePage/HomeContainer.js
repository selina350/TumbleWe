import React from 'react'
import ApplicationList from '../Application/ApplicationList'
import { Box, Grid, Typography } from '@mui/material'

const applicationsMockData = []
const HomeContainer = () => {
  return (
    <Box sx={{padding: 2}}>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="h4">
            Applications
          </Typography>
        </Grid>
        <Grid item container>
          <ApplicationList applications={applicationsMockData}/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default HomeContainer