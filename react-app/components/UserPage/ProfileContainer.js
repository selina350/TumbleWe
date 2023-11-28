import React from "react";
import {  useSelector } from "react-redux";
import EditUserForm from "./EditUserForm";

const ProfileContainer = () => {
  const user = useSelector((state) => state.controller.user);

  return (
    <div>
      <EditUserForm user={user} />
    </div>
  );
};

export default ProfileContainer;
