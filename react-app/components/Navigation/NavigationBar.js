import React, { useState } from "react";
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListSubheader,
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
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../redux/controller/userSlice";
import Logo from "../icons/Logo";

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
    window.location.href = "/login";
    // navigate("/login");
  };

  const handleProfileButton = async () => {
    window.location.href = "/profile";
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <HomeLink to="/">
            <IconButton edge="start" disableRipple>
              <Logo fontSize="large" />
            </IconButton>
          </HomeLink>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <HomeLink to="/">TumbleWe</HomeLink>
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
        MenuListProps={{
          subheader: <ListSubheader>Hi {user.username}!</ListSubheader>,
        }}
      >
        <MenuItem onClick={handleProfileButton}>
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>{" "}
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>{" "}
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavigationBar;
