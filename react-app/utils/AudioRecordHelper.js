import { MediaStreamRecorder, RecordRTCPromisesHandler } from "recordrtc";
import { uploadFileToS3 } from "./FileUploadHelper";
let recorder;
let audioBlob;

export const startRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  recorder = new RecordRTCPromisesHandler(stream, {
    type: "audio",
    mimeType: "audio/wav",
    recorderType: MediaStreamRecorder,
  });
  recorder.startRecording();
};

export const stopRecording = async () => {
  await recorder.stopRecording();
  audioBlob = await recorder.getBlob();
};

export const playRecording = () => {
  const audioURL = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioURL);
  audio.play();
};

export const uploadRecording = async (appId) => {
  const bigBlob = new Blob([audioBlob], {
    type: "audio/wav",
  });
  bigBlob.name = `app${appId}-${new Date().getTime()}.wav`;
  await uploadFileToS3(bigBlob, appId);
  return bigBlob.name;
};
