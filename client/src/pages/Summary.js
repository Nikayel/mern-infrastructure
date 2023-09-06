import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";

const Summary = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/summary", { text });
      setSummary(data);
    } catch (err) {
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if ( err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{
        boxShadow: 5,
        backgroundColor: "#000", // Dark background
        color: "#00FF00", // Green text color
        transition: "transform 0.2s ease-in-out", // Add transition
        "&:hover": {
          transform: "scale(1.05)", // Scale up on hover
        },
      }}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" sx={{ color: "#00FF00" }}>
          Summarize Text
        </Typography>

        <TextField
          placeholder="Add your text"
          type="text"
          multiline={true}
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          sx={{ backgroundColor: "#333", color: "#00FF00" }} // Dark input field
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{
            color: "#00FF00",
            mt: 2,
            backgroundColor: "#007bff", // Blue button background
            "&:hover": {
              backgroundColor: "#0056b3", // Darker blue on hover
            },
          }}
        >
          Submit
        </Button>
        <Typography mt={2} sx={{ color: "#00FF00" }}>
          Not this tool?{" "}
          <Link to="/" style={{ color: "#00FF00" }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                borderColor: "#007bff", // Blue border for the outlined button
                color: "#007bff", // Blue text color for the outlined button
              }}
            >
              GO BACK
            </Button>
          </Link>
        </Typography>
      </form>

      {summary ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "#00FF00",
            bgcolor: "#111", // Dark card background
          }}
        >
          <Typography p={2} sx={{ color: "#00FF00" }}>{summary}</Typography>
        </Card>
      ) : (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "#00FF00",
            bgcolor: "#111", // Dark card background
          }}
        >
          <Typography
            variant="h5"
            color="natural.main"
            sx={{
              textAlign: "center",
              verticalAlign: "middle",
              lineHeight: "450px",
              color: "#00FF00",
            }}
          >
            Summary Will Appear Here
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default Summary;
