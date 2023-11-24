import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
// import OpenModalButton from "../OpenModalButton";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getAllSteps, editStep, deleteStep } from "../../redux/model/stepSlice";
import StepForm from "./StepForm";

const StepTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const steps = useSelector((state) =>
    Object.values(state.model.steps).filter((value) => {
      return typeof value !== "boolean" && value.applicationId + "" === id;
    })
  );
  const application = useSelector((state) => state.model.applications[id]);

  useEffect(() => {
    dispatch(getAllSteps(id));
  }, [dispatch]);

  const handleEdit = (step) => {
    navigate(`/application/${id}/steps/${step.id}/edit`);
  };
  const handleDelete = (stepId) => {
    dispatch(deleteStep(stepId));
  };
  return (
    <div>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Selector</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {steps.map((step) => (
            <TableRow
              key={step.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{step.name}</TableCell>
              <TableCell>{step.type}</TableCell>
              <TableCell>{step.selector}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(step)}>Edit</Button>
                <Button onClick={() => handleDelete(step.id)}>Delete</Button>
              </TableCell>
              {/*<TableCell align="right">{row.type}</TableCell>*/}
            </TableRow>
          ))}
          {/* <TableBody>
              <OpenModalButton
                modalComponent={() => (
                  <div>
                    <h3>Are you sure to delete {item.name} from your menu? </h3>
                    <button
                      className="primary"
                      onClick={() => handleDelete(item.id)}
                    >
                      Yes
                    </button>
                    <button onClick={closeModal}>No</button>
                  </div>
                )}
                buttonText={
                  <div>
                    <i className="fa-solid fa-trash" /> Delete
                  </div>
                }
              />
              </TableBody> */}
        </TableBody>
      </Table>
      <StepForm appId={id} />
    </div>
  );
};

export default StepTable;
