import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Slide, // Add Slide for transition
} from "@mui/material";

const ChatBot = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [text, settext] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/v1/openai/chatbot", { text });
      console.log(data);
      setResponse(data);
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
      setIsLoading(false);
    }
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
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
          <Typography variant="h3">Ask with Chatbot</Typography>

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
              color: "white",
              mt: 2,
              backgroundColor: "#007bff",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            {isLoading ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                Loading...
              </div>
            ) : (
              "Chat"
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

        {response ? (
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
            <Typography p={2}>{response}</Typography>
          </Card>
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
              Bot Response
            </Typography>
          </Card>
        )}
      </Box>
    </Slide>
  );
};

export default ChatBot;
