import React from 'react'
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

import { styled } from '@mui/material/styles';

const HomeLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`
const NavigationBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon/>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <HomeLink to="/">
            Selina's Website
          </HomeLink>
        </Typography>
        <Button component={Link} to="/login" color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavigationBar