import { Button } from "@mui/material";
import React, { useState } from "react";
import {
  playRecording,
  startRecording,
  stopRecording,
  uploadRecording,
} from "../../utils/AudioRecordHelper";

const AudioRecorder = ({ appId, onChange }) => {
  const [status, setStatus] = useState("init");

  const handleRecord = () => {
    startRecording();
    setStatus("recording");
  };

  const handleStop = async () => {
    await stopRecording();
    playRecording();
    const fileName = await uploadRecording(appId);
    if (typeof onChange === "function") {
      onChange(fileName);
    }
    setStatus("init");
  };

  return (
    <div>
      {status === "init" && (
        <Button variant="outlined" fullWidth onClick={handleRecord}>
          Record
        </Button>
      )}
      {status === "recording" && (
        <Button variant="outlined" fullWidth onClick={handleStop}>
          Stop
        </Button>
      )}
    </div>
  );
};

export default AudioRecorder;
