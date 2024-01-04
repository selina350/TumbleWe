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
import StepEditContainer from "./Step/StepEditContainer";
import ProfileContainer from "./UserPage/ProfileContainer";
import LoginRequiredRoute from "./LoginRequiredRoute";
import AlertContainer from "./Notifications/AlertContainer";
import ConfirmationContainer from "./Notifications/ConfirmationContainer";
import FooterContent from "./FooterContent";

const HeaderLayout = () => (
  <>
    <AlertContainer />
    <ConfirmationContainer />
    <header>
      <NavigationBar />
    </header>
    <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
      <Outlet />
    </Box>
    <footer>
      <FooterContent />
    </footer>
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<HeaderLayout />}>
      <Route index element={<HomeContainer />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/signup" element={<SignupContainer />} />
      <Route path="/profile" element={<ProfileContainer />} />
      <Route
        path="/application/:id"
        element={
          <LoginRequiredRoute>
            <ApplicationContainer tab={0} />
          </LoginRequiredRoute>
        }
      />
      <Route
        path="/application/:id/steps"
        element={
          <LoginRequiredRoute>
            <ApplicationContainer tab={1} />
          </LoginRequiredRoute>
        }
      />
      <Route
        path="/application/:appId/steps/:stepId/edit"
        element={
          <LoginRequiredRoute>
            <StepEditContainer />
          </LoginRequiredRoute>
        }
      />
    </Route>
  )
);

export default router;
