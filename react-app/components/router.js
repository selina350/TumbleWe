import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  Outlet,
} from "react-router-dom";
import HomeContainer from "./HomePage/HomeContainer";
import LoginContainer from "./UserPage/LoginContainer";
import SignupContainer from "./UserPage/SignupContainer";
import NavigationBar from "./Navigation/NavigationBar";
import { Box } from "@mui/material";
import ApplicationContainer from "./Application/ApplicationContainer";
import StepTable from "./Step/StepTable";
import StepEditContainer from "./Step/StepEditContainer";

const HeaderLayout = () => (
  <>
    <header>
      <NavigationBar />
    </header>
    <Box sx={{ height: "calc(100vh - 64px)" }}>
      <Outlet />
    </Box>
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<HeaderLayout />}>
      <Route index element={<HomeContainer />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/signup" element={<SignupContainer />} />
      <Route path="/application/:id" element={<ApplicationContainer />} />
      <Route path="/application/:id/steps" element={<StepTable />} />
      <Route
        path="/application/:appId/steps/:stepId/edit"
        element={<StepEditContainer />}
      />
    </Route>
  )
);

export default router;
