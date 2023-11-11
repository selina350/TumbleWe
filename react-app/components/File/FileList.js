import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFiles,
  createFile,
  editFile,
  deleteFile,
} from "../../redux/model/fileSlice";
import { useParams } from "react-router-dom";

const FileList = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const fileList = useSelector((state) => state.model.files);
  console.log(typeof fileList)
  const applications = useSelector((state) => state.model.applications);
  const currentApplication = applications[id];
  console.log(currentApplication)
  useEffect(() => {
    dispatch(getAllFiles(id));
  }, [dispatch]);
  if (currentApplication && fileList.length > 0) {
    return (
      <div>
        <h2>File List</h2>
        {fileList.map((file) => (
          <div>
            <div>{file.name}</div>
            <div>{file.imgUrl}</div>
          </div>
        ))}
        <ul></ul>
      </div>
    );
  }
};

export default FileList;
