import React, { useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import ProfileIcon from "@mui/icons-material/Person";
import { logout } from "../../redux/controller/userSlice";

const HomeLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const NavigationBar = () => {
  // const navigate = useNavigate();
  const user = useSelector((state) => state.controller.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleLogout = async () => {
    setAnchorEl(null);
    await dispatch(logout());
    window.location.href = '/login';
    // navigate("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <HomeLink to="/">Selina's Website</HomeLink>
          </Typography>
          {user.email && (
            <IconButton
              color="inherit"
              edge="end"
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              <ProfileIcon />
            </IconButton>
          )}
          {!user.email && (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default NavigationBar;
