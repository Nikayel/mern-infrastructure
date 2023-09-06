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
  Icon, // Import Icon from Material-UI
} from "@mui/material";

const Paragraph = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [text, settext] = useState("");
  const [para, setPara] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/paragraph", { text });
      setPara(data);
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
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Generate Paragraph</Typography>

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
          sx={{ backgroundColor: "#007bff", color: "white", mt: 2 }}
        >
          Generate
        </Button>
        <Typography mt={2}>
          Not what you're looking for?{" "}
          <Link to="/">
            <Button variant="outlined" color="primary">
              GO BACK
            </Button>
          </Link>
        </Typography>
      </form>

      {para ? (
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
          <Typography p={2}>{para}</Typography>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              flexDirection: "column",
            }}
          >
            {/* Add Material-UI icons here */}
            <Icon
              color="primary"
              fontSize="large"
              style={{ marginBottom: "16px" }}
            >
              insert_emoticon
            </Icon>
            <Typography
              variant="h5"
              color="natural.main"
              sx={{
                textAlign: "center",
                mt: 2,
              }}
            >
              Your Paragraph Will Appear Here
            </Typography>
            <Icon
              color="secondary"
              fontSize="large"
              style={{ marginTop: "16px" }}
            >
              insert_emoticon
            </Icon>
          </div>
        </Card>
      )}
    </Box>
  );
};

export default Paragraph;
