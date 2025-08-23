import React, { useState } from "react";

const FlightInfo = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const fetchFlights = async (lat, lon) => {
    const radius = 0.5; // ~50km
    const url = `https://opensky-network.org/api/states/all?lamin=${
      lat - radius
    }&lomin=${lon - radius}&lamax=${lat + radius}&lomax=${lon + radius}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.states) {
        setFlights(data.states);
        setError("");
      } else {
        setFlights([]);
        setError("No flights found near this location.");
      }
    } catch (err) {
      setError("Error fetching flight data.");
      console.error(err);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (lat && lon) {
      fetchFlights(parseFloat(lat), parseFloat(lon));
    } else {
      setError("Please enter valid latitude and longitude.");
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log("Your location:", lat, lon);
          fetchFlights(lat, lon);
        },
        (err) => {
          setError("Error getting location: " + err.message);
        }
      );
    } else {
      setError("Geolocation not supported by this browser.");
    }
  };

  return (
    <div>
      <h2 style={{ color: "white" }}>Nearby Flights</h2>

      {/* Option 1: Use current location */}
      <button onClick={handleCurrentLocation}>
        Get Flights at My Location
      </button>

      <hr />

      {/* Option 2: Enter lat/lon manually */}
      <form onSubmit={handleManualSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="number"
          step="0.0001"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          type="number"
          step="0.0001"
          placeholder="Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
        />
        <button type="submit">Check Flights</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {flights.length === 0 && !error && <p>No flights loaded yet.</p>}

      {flights.length > 0 && (
        <div
          style={{
            backdropFilter: "blur(8px)",
            background: "rgba(255,255,255,0.5)",
            borderRadius: "10px",
            padding: "10px",
            display: "inline-block",
          }}
        >
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Callsign</th>
                <th>Origin Country</th>
                <th>Altitude (m)</th>
                <th>Velocity (m/s)</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight, index) => (
                <tr key={index}>
                  <td>{flight[1] || "N/A"}</td>
                  <td>{flight[2] || "N/A"}</td>
                  <td>{flight[7] !== null ? flight[7].toFixed(2) : "N/A"}</td>
                  <td>{flight[9] !== null ? flight[9].toFixed(2) : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FlightInfo;
