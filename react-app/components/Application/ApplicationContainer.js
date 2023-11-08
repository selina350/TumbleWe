import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Grid, TextField } from '@mui/material'
import FileList from '../File/FileList'

const ApplicationContainer = () => {
  const { id } = useParams()
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item container alignItems="center">
          <Grid item xs={12} md={2}>
            Name:
          </Grid>
          <Grid item xs>
            <TextField
              value={id}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item container alignItems="center">
          <Grid item xs={12} md={2}>
            Files:
          </Grid>
          <Grid item xs>
            <FileList/>
          </Grid>
        </Grid>
      </Grid>
    </Box>
)
}

export default ApplicationContainer