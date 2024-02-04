import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const auth = localStorage.getItem("user");

  if (!auth) {
    return null;
  }

  const logout = () => {
    localStorage.clear();

    toast.success("Logging Out ");

    navigate("/login");
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.background.alt,
          backgroundImage: "none",
          boxShadow: "none",
          borderBottom: "1px solid #bbb",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* left side */}
          <FlexBetween gap="1.5rem">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <NavLink to="/dashboard">
              <Typography
                variant="h4"
                fontWeight="bold"
                color={theme.palette.secondary.main}
                noWrap
              >
                Technical Tambola
              </Typography>
            </NavLink>
          </FlexBetween>

          {/* right side */}
          <FlexBetween gap="1.5rem">
            <NavLink to="/dashboard">
              <Typography variant="h5">Dashboard</Typography>
            </NavLink>
            <NavLink to="/question">
              <Typography variant="h5">Question</Typography>
            </NavLink>
            <NavLink to="/answers">
              <Typography variant="h5">Answers</Typography>
            </NavLink>
            <Button variant="outlined" color="secondary" onClick={logout}>
              Logout
            </Button>
          </FlexBetween>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;

Navbar.propTypes = {
  user: PropTypes.object,
  isSidebarOpen: PropTypes.bool,
  setIsSidebarOpen: PropTypes.func,
  drawerWidth: PropTypes.any,
};
