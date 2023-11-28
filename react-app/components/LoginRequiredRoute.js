import { Dialog, DialogContent, Slide } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "./UserPage/LoginForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const LoginRequiredRoute = ({ children }) => {
  const user = useSelector((state) => state.controller.user);

  if (user?.email === undefined) {
    return (
      <>
        <Dialog open={true} TransitionComponent={Transition}>
          <DialogContent>
            <LoginForm />
          </DialogContent>
        </Dialog>
        {children}
      </>
    );
  }

  return children;
};

export default LoginRequiredRoute;
