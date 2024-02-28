import React, { useState } from "react";
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

//hard code data
const apis = [
  {
    id: 1,
    method: "GET",
    path: "/api/test",
    response: "value",
    responseType: "text",
  },
  {
    id: 2,
    method: "POST",
    path: "/api/post-test",
    response: { key: "value" },
    responseType: "json",
  },
];

const ApplicationMockAPIContainer = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
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
            {apis.map((api) => (
              <TableRow key={api.id}>
                <TableCell component="th" scope="row">
                  {api.method}
                </TableCell>
                <TableCell>{api.path}</TableCell>
                <TableCell>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
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
        <MockAPIForm />
      </Drawer>
    </>
  );
};

export default ApplicationMockAPIContainer;
