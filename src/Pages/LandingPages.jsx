import React from "react";
import Box from "@mui/material/Box";
import Theme from "../Components/Theme";
import FlightInfo from "../Components/FlightInfo";

const LandingPages = () => {
  return (
    <Box>
      <h1 style={{ color: "white" }}>Welcome to the Aeroplane Tracker</h1>

      <FlightInfo />
      <Theme />
    </Box>
  );
};

export default LandingPages;
