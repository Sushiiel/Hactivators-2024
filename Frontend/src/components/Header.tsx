import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();
  
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
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#7C3AED" // Violet background for "Go To Chat" button
                to="/chat"
                text="Go To Chat"
                textColor="white" // White text for contrast
              />
              <NavigationLink
                bg="#000000" // Black background for logout button
                textColor="white"
                to="/"
                text="Logout"
                onClick={auth.logout}
                borderColor="#7C3AED" // Violet border
                hoverBg="#7C3AED" // Violet on hover
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#7C3AED" // Violet background for "Login" button
                to="/login"
                text="Login"
                textColor="white" // White text for contrast
              />
              <NavigationLink
                bg="#000000" // Black background for "Signup" button
                textColor="white"
                to="/signup"
                text="Signup"
                borderColor="#7C3AED" // Violet border
                hoverBg="#7C3AED" // Violet on hover
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header
