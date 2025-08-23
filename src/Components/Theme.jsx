import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import morningImage from "../Assets/morning.jpg";
import eveningImage from "../Assets/evening.jpg";
import nightImage from "../Assets/night.jpg";

const Theme = () => {
  useEffect(() => {
    const hour = new Date().getHours();
    let bgImage = "";

    if (hour >= 6 && hour < 17) {
      bgImage = morningImage;
    } else if (hour >= 17 && hour < 19) {
      bgImage = eveningImage;
    } else {
      bgImage = nightImage;
    }

    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "background-image 1s ease-in-out";
  }, []); // runs once when component mounts

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "2rem",
        fontWeight: "bold",
        textShadow: "2px 2px 5px black",
      }}
    ></Box>
  );
};

export default Theme;
