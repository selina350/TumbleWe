import React from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route, Outlet,
} from 'react-router-dom'
import HomeContainer from './HomePage/HomeContainer'
import LoginContainer from './UserPage/LoginContainer'
import NavigationBar from './Navigation/NavigationBar'
const HeaderLayout = () => (
  <>
    <header>
      <NavigationBar />
    </header>
    <Outlet/>
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<HeaderLayout/>}>
      <Route index element={<HomeContainer/>}/>
      <Route
        path="login"
        element={<LoginContainer />}
      />
    </Route>,
  ))

export default router