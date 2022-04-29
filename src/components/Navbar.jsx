import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  InputBase,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { Mail, Notifications, Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { sideBarToggle } from "../redux/navigateSlice";
import { logOutUser } from "../redux/apiRequests";

const SearchComponent = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "40%",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  display: "flex",
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const IconButtons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const NavBar = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const user = useSelector((state) => state.user.user?.currentUser);
  const isOpen = useSelector((state) => state.nav.sidebar.open);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    dispatch(sideBarToggle(!isOpen));
  };

  const logOut = () => {
    logOutUser(dispatch, user?.accessToken, user?._id, navigate);
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

        <SearchComponent>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            // inputProps={{ "aria-label": "search" }}
          />
        </SearchComponent>

        <IconButtons>
          <IconButton
            size="small"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <Mail />
            </Badge>
          </IconButton>
          <IconButton
            size="small"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton
            size="medium"
            edge="end"
            aria-label="account of current user"
            color="inherit"
          >
            <Avatar
              sx={{ width: 30, height: 30 }}
              alt={user?.username}
              src={user?.avatar}
              onClick={(e) => setOpenMenu(true)}
            />
          </IconButton>
        </IconButtons>
        <UserBox onClick={(e) => setOpenMenu(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            alt={user?.username}
            src={user?.avatar}
          />
          <Typography variant="span">{user?.username}</Typography>
        </UserBox>
      </Toolbar>
      <Menu
        id="menu"
        aria-labelledby="button"
        open={openMenu}
        onClose={(e) => setOpenMenu(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <NavLink
              to={`/user/${user?._id}`}
              style={{ textDecoration: "none", color: "unset" }}
        >
          <MenuItem>Profile</MenuItem>
        </NavLink>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavBar;
