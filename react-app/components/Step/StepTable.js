import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
// import OpenModalButton from "../OpenModalButton";
import { Button, IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  getAllSteps,
  editStep,
  deleteStep,
  changeStepOrder,
} from "../../redux/model/stepSlice";
import StepForm from "./StepForm";
import { displayConfirmation } from "../../redux/controller/confirmationSlice";
import { displayAlert } from "../../redux/controller/alertSlice";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { sortSteps } from "../../utils/stepHelper";

const StepTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const steps = useSelector((state) =>
    sortSteps(
      Object.values(state.model.steps).filter((value) => {
        return typeof value !== "boolean" && value.applicationId + "" === id;
      })
    )
  );
  const application = useSelector((state) => state.model.applications[id]);

  useEffect(() => {
    dispatch(getAllSteps(id));
  }, [dispatch]);

  const handleEdit = (step) => {
    navigate(`/application/${id}/steps/${step.id}/edit`);
  };
  const handleDelete = (stepId) => {
    dispatch(
      displayConfirmation({
        message: "Are you sure about deleting this step?",
        onConfirm: async () => {
          await dispatch(deleteStep(stepId));
          dispatch(displayAlert("This step has been deleted sucessfully!"));
        },
      })
    );
  };

  const handleChangeOrder = (direction, stepId) => {
    dispatch(changeStepOrder(direction, stepId, id));
  };

  return (
    <div>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Selector</TableCell>
            <TableCell>innerHTML</TableCell>
            <TableCell>Sort</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {steps.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;
            return (
              <TableRow
                key={step.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{step.name}</TableCell>
                <TableCell>{step.type}</TableCell>
                <TableCell>{step.selector}</TableCell>
                <TableCell>{step.innerHTML}</TableCell>
                <TableCell>
                  {!isFirst && (
                    <IconButton
                      color="primary"
                      onClick={() => handleChangeOrder(index - 1, step.id)}
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                  {!isLast && (
                    <IconButton
                      color="primary"
                      onClick={() => handleChangeOrder(index + 1, step.id)}
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(step)}>Edit</Button>
                  <Button onClick={() => handleDelete(step.id)}>Delete</Button>
                </TableCell>
                {/*<TableCell align="right">{row.type}</TableCell>*/}
              </TableRow>
            );
          })}
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
