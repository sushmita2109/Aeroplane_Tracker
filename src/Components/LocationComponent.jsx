import Box from "@mui/material/Box";
import React, { useState } from "react";
import Button from "@mui/material/Button";

const LocationComponent = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setError("");
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };
  return (
    <Box>
      <Button variant="contained" onClick={getLocation}>
        Get Current Location
      </Button>
      {location.lat && location.lon && (
        <p>
          Latitude:{location.lat} <br />
          Longitude:{location.lon}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Box>
  );
};

export default LocationComponent;
