import React from "react";
import { useSelector } from "react-redux";
import EditUserForm from "./EditUserForm";
import Container from "@mui/material/Container";
const ProfileContainer = () => {
  const user = useSelector((state) => state.controller.user);

  return (
    <Container maxWidth="xs">
      <EditUserForm user={user} />
    </Container>
  );
};

export default ProfileContainer;
