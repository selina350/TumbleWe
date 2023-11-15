import React, { useRef, useState } from 'react'
import { Box, Grid, Paper, Button } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import FileTable from './FileTable'
import {
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { uploadFileToS3 } from '../../utils/FileUploadHelper'

const FileManageContainer = () => {
  const uploadFileInputRef = useRef()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const fileName = file.name
    console.log(fileName)
    uploadFileToS3(file)
  }
  const handleFileUpload = async () => {
    uploadFileInputRef.current.click()
  }
  return (<Box component={Paper} sx={{ padding: 2 }}>
    <Grid container direction="column">
      <Grid item container spacing={2}>
        <Grid item>
          <Button
            onClick={handleFileUpload}
            variant="contained"
            startIcon={<UploadIcon/>}
          >Upload File</Button>
          <input
            type="file"
            onChange={handleFileChange}
            ref={uploadFileInputRef}
            style={{ display: 'none' }}
          />
        </Grid>
        {/*<Grid item>*/}
        {/*  <Button variant="outlined" startIcon={<FolderIcon/>}>Create Folder</Button>*/}
        {/*</Grid>*/}
      </Grid>
      <Grid item><FileTable/></Grid>
    </Grid>
  </Box>)
}

export default FileManageContainer