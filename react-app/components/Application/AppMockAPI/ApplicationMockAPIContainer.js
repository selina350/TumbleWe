import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Box, Button, Drawer } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MockAPIForm from "./MockAPIForm";
import {
  getAllMockApis,
  deleteMockApi,
} from "../../../redux/model/mockApiSlice";
import {displayConfirmation} from "../../../redux/controller/confirmationSlice"
import { displayAlert } from "../../../redux/controller/alertSlice";

const ApplicationMockAPIContainer = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [seletedApiId, setSeletedApiId] = useState()
  const { id } = useParams();
  const dispatch = useDispatch();
  const mockApis = useSelector((state) =>
    Object.values(state.model.mockApis).filter((value) => {
      return typeof value !== "boolean" && value.applicationId + "" === id;
    })
  );

  useEffect(() => {
    dispatch(getAllMockApis(id));
  }, [dispatch]);

  const handleEdit = (mockApiId) => {
    setSeletedApiId(mockApiId)
    setDrawerOpen(true)

  };
  const handleDelete = (mockApiId) => {
    dispatch(
      displayConfirmation({
        message: "Are you sure about deleting this mockApi?",
        onConfirm: async () => {
          await dispatch(deleteMockApi(mockApiId));
          dispatch(displayAlert("This mock api has been deleted sucessfully!"));
        },
      })
    );
  };

  return (
    <>
      <Paper>
        <Box sx={{ padding: 2 }}>
          <Grid container>
            <Grid item>
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                onClick={() => setDrawerOpen(true)}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Method</TableCell>
              <TableCell>Path</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockApis.map((api) => (
              <TableRow key={api.id}>
                <TableCell component="th" scope="row">
                  {api.method}
                </TableCell>
                <TableCell>{api.path}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(api.id)}>Edit</Button>
                  <Button onClick={() => handleDelete(api.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MockAPIForm
          onCancel={() => setDrawerOpen(false)}
          onFinish={() => setDrawerOpen(false)}
          apiId={seletedApiId}
        />
      </Drawer>
    </>
  );
};

export default ApplicationMockAPIContainer;
