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
  // Media query
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // States
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/summary", { text });
      setSummary(data);
    } catch (err) {
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
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
          sx={{ color: "#00FF00", mt: 2, backgroundColor: "#222" }} // Dark button
        >
          Submit
        </Button>
        <Typography mt={2} sx={{ color: "#00FF00" }}>
          Not this tool? <Link to="/" style={{ color: "#00FF00" }}>GO BACK</Link>
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
