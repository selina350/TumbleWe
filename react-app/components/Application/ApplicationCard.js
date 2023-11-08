import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  Typography,
} from '@mui/material'

const ApplicationCard = ({ application }) => {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardActionArea>
        <CardContent sx={{ minHeight: 150, display: 'flex' }}>
          <Grid container>
            <Grid item xs> </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ApplicationCard