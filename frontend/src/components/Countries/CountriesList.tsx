import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, CircularProgress, Typography } from "@mui/material";
import CountryCard from "./CountryCard";
import { fetchAllCountries } from "../../store/slices/countriesSlice";
import { RootState, AppDispatch } from "../../store/store";

const CountriesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { countries, loading, error } = useSelector(
    (state: RootState) => state.countries
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem" }}>
      <TextField
        label="Search countries"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: "1rem" }}
      />

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredCountries.map((country) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
              <CountryCard country={country} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CountriesList;
