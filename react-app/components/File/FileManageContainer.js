import React, { useRef, useState } from "react";
import { Box, Grid, Paper, Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import FileTable from "./FileTable";
import { uploadFileToS3 } from "../../utils/FileUploadHelper";
import { useDispatch } from "react-redux";
import { createFile } from "../../redux/model/fileSlice";
import { useParams } from "react-router-dom";

const FileManageContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const uploadFileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const fileName = file.name;
    const fileUrl = file.url
    console.log(fileName);
    await uploadFileToS3(file, id);
    dispatch(createFile(id, fileName, fileUrl));
    e.target.value = null;
  };
  const handleFileUpload = async () => {
    uploadFileInputRef.current.click();
  };
  return (
    <Box component={Paper} sx={{ padding: 2 }}>
      <Grid container direction="column">
        <Grid item container spacing={2}>
          <Grid item>
            <Button
              onClick={handleFileUpload}
              variant="contained"
              startIcon={<UploadIcon />}
            >
              Upload File
            </Button>
            <input
              type="file"
              onChange={handleFileChange}
              ref={uploadFileInputRef}
              style={{ display: "none" }}
            />
          </Grid>
          {/*<Grid item>*/}
          {/*  <Button variant="outlined" startIcon={<FolderIcon/>}>Create Folder</Button>*/}
          {/*</Grid>*/}
        </Grid>
        <Grid item>
          <FileTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FileManageContainer;
