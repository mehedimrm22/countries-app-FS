import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

const WeatherInfo = () => {
  const weather = useSelector((state: RootState) => state.weather);

  if (weather.loading) {
    return <CircularProgress />;
  }

  if (weather.error) {
    return (
      <Typography color="error">Weather Error: {weather.error}</Typography>
    );
  }

  if (!weather.data) {
    return <Typography>No weather data available</Typography>;
  }

  const { main, weather: weatherDetails, wind } = weather.data;

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Weather Info
        </Typography>
        <Typography>Temperature: {main.temp}°C</Typography>
        <Typography>Feels Like: {main.feels_like}°C</Typography>
        <Typography>Humidity: {main.humidity}%</Typography>
        <Typography>Wind Speed: {wind.speed} m/s</Typography>
        <Typography>Description: {weatherDetails[0].description}</Typography>
        <img
          src={`https://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`}
          alt={weatherDetails[0].description}
        />
      </CardContent>
    </Card>
  );
};

export default WeatherInfo;
