import React, { useEffect } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { Provider, useDispatch } from 'react-redux'
import store from '../redux/store'
import { fetchUser } from '../redux/controller/userSlice'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  return (
    <div>
      <CssBaseline/>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App