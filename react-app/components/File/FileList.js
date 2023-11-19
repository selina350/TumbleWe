import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFiles } from "../../redux/model/fileSlice";
import { useParams } from "react-router-dom";

const FileList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const files = useSelector((state) =>
    Object.values(state.model.files).filter((value) => {
      return typeof value !== "boolean" && value.applicationId === id;
    })
  );
  const application = useSelector((state) => state.model.applications[id]);

  useEffect(() => {
    dispatch(getAllFiles(id));
  }, [dispatch]);
  if (application && files.length > 0) {
    return (
      <div>
        <h2>File List</h2>
        {files.map((file) => (
          <div>
            <div>name: {file.name}</div>
            <div>url: {file.url}</div>
          </div>
        ))}
        <ul></ul>
      </div>
    );
  }
};

export default FileList;
