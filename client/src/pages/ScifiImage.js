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
  CircularProgress, // Add CircularProgress for loading animation
  Fade, // Add Fade for transitions
} from "@mui/material";

const ScifiImage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [text, settext] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading animation
    try {
      const { data } = await axios.post("/api/v1/openai/scifi-image", { text });
      console.log(data);
      setImage(data);
    } catch (err) {
      console.log(error);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Scifi Image</Typography>

        <TextField
          placeholder="Add your text"
          type="text"
          multiline={true}
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => {
            settext(e.target.value);
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#007bff",
            color: "white",
            mt: 2,
            "&:hover": {
              backgroundColor: "#0056b3", // Darker blue on hover
            },
          }}
        >
          {isLoading ? ( // Show loading animation if isLoading is true
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit"
          )}
        </Button>
        <Typography mt={2}>
          Not this tool?{" "}
          <Link to="/" style={{ color: "#007bff" }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                borderColor: "#007bff",
                color: "#007bff",
              }}
            >
              GO BACK
            </Button>
          </Link>
        </Typography>
      </form>

      {image ? (
        <Fade in={true}>
          <Card
            sx={{
              mt: 4,
              border: 1,
              boxShadow: 0,
              height: "500px",
              borderRadius: 5,
              borderColor: "natural.medium",
              bgcolor: "background.default",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
              <img src={image} alt="scifiimage" />
            </Box>
          </Card>
        </Fade>
      ) : (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
          }}
        >
          <Typography
            variant="h5"
            color="natural.main"
            sx={{
              textAlign: "center",
              verticalAlign: "middle",
              lineHeight: "450px",
            }}
          >
            Your Scifi Image Will Appear Here
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default ScifiImage;
