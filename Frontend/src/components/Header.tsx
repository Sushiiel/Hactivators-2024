import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  
  return (
    <AppBar
      sx={{
        bgcolor: "#000000", // Black background
        position: "static",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
      </Toolbar>
    </AppBar>
  );
};

export default Header
