import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import OpenModalButton from "../OpenModalButton";
import { Button, CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { getAllFiles, editFile, deleteFile } from "../../redux/model/fileSlice";
import { displayAlert } from "../../redux/controller/alertSlice";
import { displayConfirmation } from "../../redux/controller/confirmationSlice";
const FileTable = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const files = useSelector((state) =>
    Object.values(state.model.files).filter((value) => {
      return typeof value !== "boolean" && value.applicationId + "" === id;
    })
  );
  console.log(files);

  const application = useSelector((state) => state.model.applications[id]);

  useEffect(() => {
    dispatch(getAllFiles(id));
  }, [dispatch]);

  const handleDelete = (FileId) => {
    dispatch(
      displayConfirmation({
        message: "Are you sure about deleting this file?",
        onConfirm: async () => {
          await dispatch(deleteFile(FileId));
          dispatch(displayAlert("This file has been deleted sucessfully!"));
        },
      })
    );
  };
  return (
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          {/*<TableCell align="right">Type</TableCell>*/}
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      {application && (
        <TableBody>
          {files.map((file) => (
            <TableRow
              key={file.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {file.name} {file.pending && <CircularProgress size={16} />}
              </TableCell>
              <TableCell>
                {!file.pending && (
                  <Button onClick={() => handleDelete(file.id)}>Delete</Button>
                )}
              </TableCell>
              {/*<TableCell align="right">{row.type}</TableCell>*/}
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};

export default FileTable;
