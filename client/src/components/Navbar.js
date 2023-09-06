import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      width="100%"
      bgcolor="#222" // Dark background color
      p="1rem 6%"
      textAlign="center"
      boxShadow={3}
      mb={2}
    >
      <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
        AI Friend
      </Typography>
      <Box display="flex" justifyContent="center">
        {loggedIn ? (
          <>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <Button
                color="primary"
                variant="contained" // Filled button style
                mx={1}
                style={{
                  backgroundColor: "#00FF00", // Green color
                  color: "#222", // Dark text color
                  fontFamily: "monospace",
                  fontWeight: "bold",
                }}
              >
                Home
              </Button>
            </NavLink>
            <Button
              onClick={handleLogout}
              color="primary"
              variant="contained" // Filled button style
              mx={1}
              style={{
                backgroundColor: "#FF0000", // Red color
                color: "#222", // Dark text color
                fontFamily: "monospace",
                fontWeight: "bold",
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/register" style={{ textDecoration: "none" }}>
              <Button
                color="primary"
                variant="contained" // Filled button style
                mx={1}
                style={{
                  backgroundColor: "#00FF00", // Green color
                  color: "#222", // Dark text color
                  fontFamily: "monospace",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Button>
            </NavLink>
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              <Button
                color="primary"
                variant="contained" // Filled button style
                mx={1}
                style={{
                  backgroundColor: "#FF0000", // Red color
                  color: "#222", // Dark text color
                  fontFamily: "monospace",
                  fontWeight: "bold",
                }}
              >
                Sign In
              </Button>
            </NavLink>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
