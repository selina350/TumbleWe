import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSteps } from "../../redux/model/stepSlice";
import StepForm from "./StepForm";

const StepEditContainer = () => {
  const { appId, stepId } = useParams();
  const dispatch = useDispatch();
  const step = useSelector((state) => state.model.steps[stepId]);
  useEffect(() => {
    dispatch(getAllSteps(appId));
  }, [dispatch]);

  return (
    <div>
      <StepForm appId={appId} stepId={stepId}/>
    </div>
  );
};

export default StepEditContainer;
