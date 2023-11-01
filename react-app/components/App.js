import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import NavigationBar from './Navigation/NavigationBar'

const App = () => {
  return (
    <div>
      <CssBaseline/>
      <NavigationBar/>
    </div>
  )
}

export default App