import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ImageIcon from "@mui/icons-material/Image";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();

  const cardsData = [
    {
      title: "Text Generation",
      description: "Summarize long text into short sentences",
      icon: <DescriptionRoundedIcon sx={{ fontSize: 80, color: "#2196F3" }} />,
      path: "/summary",
    },
    {
      title: "Paragraph Generation",
      description: "Generate Paragraph with words",
      icon: (
        <FormatAlignLeftOutlinedIcon sx={{ fontSize: 80, color: "#FF5722" }} />
      ),
      path: "/paragraph",
    },
    {
      title: "AI ChatBot",
      description: "Chat With AI Chatbot",
      icon: <ChatRoundedIcon sx={{ fontSize: 80, color: "#E91E63" }} />,
      path: "/chatbot",
    },
    {
      title: "JavaScript Converter",
      description: "Translate English to JavaScript code",
      icon: (
        <FormatAlignLeftOutlinedIcon sx={{ fontSize: 80, color: "#4CAF50" }} />
      ),
      path: "/js-converter",
    },
    {
      title: "AI Sci-Fi Images",
      description: "Generate Sci-Fi images",
      icon: <ImageIcon sx={{ fontSize: 80, color: "#FFC107" }} />,
      path: "/scifi-image",
    },
  ];

  return (
    <Grid container spacing={3} className="homepage-grid">
      {cardsData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card
            onClick={() => navigate(card.path)}
            className="sci-fi-card"
          >
            {card.icon}
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Homepage;
