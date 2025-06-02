import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../store/store";
import { fetchAllCountries } from "../../store/slices/countriesSlice";
import { fetchWeather } from "../../store/slices/weatherSlice";
import { Button, Typography, CircularProgress } from "@mui/material";
import WeatherInfo from "../../components/Weather/WeatherInfo";

const CountryDetail = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { countries, loading, error } = useSelector(
    (state: RootState) => state.countries
  );

  const country = countries.find(
    (c) => encodeURIComponent(c.name.common) === name
  );

  useEffect(() => {
    if (!countries.length) {
      dispatch(fetchAllCountries());
    }
  }, [dispatch, countries.length]);

  useEffect(() => {
    if (country?.capital?.[0]) {
      dispatch(fetchWeather(country.capital[0]));
    }
  }, [dispatch, country]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!country) return <Typography>Country not found</Typography>;

  return (
    <div style={{ padding: "2rem" }}>
      <Button variant="contained" onClick={() => navigate(-1)}>
        Back
      </Button>
      <Typography variant="h4" gutterBottom>
        {country.name.common}
      </Typography>
      <img
        src={country.flags.png}
        alt={country.flags.alt || country.name.common}
        width="200"
      />
      <Typography>Region: {country.region}</Typography>
      <Typography>Subregion: {country.subregion}</Typography>
      <Typography>Capital: {country.capital?.[0] || "N/A"}</Typography>
      <Typography>Population: {country.population.toLocaleString()}</Typography>
      <Typography>
        Currency:{" "}
        {country.currencies
          ? Object.values(country.currencies)[0].name +
            " (" +
            Object.values(country.currencies)[0].symbol +
            ")"
          : "N/A"}
      </Typography>
      <div style={{ marginTop: "1rem" }}>
        <WeatherInfo />
      </div>
    </div>
  );
};

export default CountryDetail;
