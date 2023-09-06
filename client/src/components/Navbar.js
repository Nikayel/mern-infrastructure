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
      bgcolor="#2E3B4E" // Updated background color
      p="1rem 6%"
      textAlign="center"
      boxShadow={3}
      mb={2}
      sx={{ transition: "background-color 0.3s" }} // Add transition effect
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
                sx={{
                  backgroundColor: "#00B050", // Updated green color
                  color: "#fff", // White text color
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#008940", // Darker green on hover
                  },
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
              sx={{
                backgroundColor: "#FF3D00", // Updated red color
                color: "#fff", // White text color
                fontFamily: "monospace",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#D13000", // Darker red on hover
                },
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
                sx={{
                  backgroundColor: "#00B050", // Updated green color
                  color: "#fff", // White text color
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#008940", // Darker green on hover
                  },
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
                sx={{
                  backgroundColor: "#FF3D00", // Updated red color
                  color: "#fff", // White text color
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#D13000", // Darker red on hover
                  },
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
