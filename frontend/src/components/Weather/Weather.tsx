// src/components/Weather.tsx

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, clearWeather } from "../../store/slices/weatherSlice";
import { RootState, AppDispatch } from "../../store/store";
import { WeatherData } from "../../types/weather";

const Weather = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const weatherState = useSelector((state: RootState) => state.weather);

  const handleSearch = () => {
    if (city.trim()) {
      dispatch(fetchWeather(city));
    }
  };

  const handleClear = () => {
    setCity("");
    dispatch(clearWeather());
  };

  const data = weatherState.data as WeatherData | null;

  return (
    <Box sx={{ maxWidth: 500, margin: "2rem auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Weather Check
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            label="Enter city"
            variant="outlined"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSearch}
            disabled={weatherState.loading}
          >
            Get Weather
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" fullWidth onClick={handleClear}>
            Clear
          </Button>
        </Grid>
      </Grid>

      {weatherState.loading && (
        <Box textAlign="center" mt={3}>
          <CircularProgress />
        </Box>
      )}

      {weatherState.error && (
        <Typography color="error" mt={2} textAlign="center">
          Error: {weatherState.error}
        </Typography>
      )}

      {data && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Weather in {city}
            </Typography>
            <Typography>
              <strong>Temperature:</strong> {data.main.temp}°C
            </Typography>
            <Typography>
              <strong>Feels Like:</strong> {data.main.feels_like}°C
            </Typography>
            <Typography>
              <strong>Humidity:</strong> {data.main.humidity}%
            </Typography>
            <Typography>
              <strong>Wind Speed:</strong> {data.wind.speed} m/s
            </Typography>
            <Typography>
              <strong>Description:</strong> {data.weather[0].description}
            </Typography>
            <Box mt={2}>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Weather;
