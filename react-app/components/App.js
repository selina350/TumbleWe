import React, { useEffect } from "react";
import { CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/controller/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.controller.user);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (user.fetchPending === true) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <CssBaseline />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
