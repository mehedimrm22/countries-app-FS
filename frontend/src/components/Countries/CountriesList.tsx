import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  TextField,
  CircularProgress,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Pagination,
} from "@mui/material";
import CountryCard from "./CountryCard";
import { fetchAllCountries } from "../../store/slices/countriesSlice";
import { RootState, AppDispatch } from "../../store/store";

const CountriesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { countries, loading, error } = useSelector(
    (state: RootState) => state.countries
  );

  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 12;

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  const handleClearFilters = () => {
    setSearch("");
    setRegionFilter("");
    setSortOption("");
    setCurrentPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    .filter((country) =>
      regionFilter ? country.region === regionFilter : true
    )
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.name.common.localeCompare(b.name.common);
      } else if (sortOption === "population") {
        return b.population - a.population;
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
  const paginatedCountries = filteredCountries.slice(
    (currentPage - 1) * countriesPerPage,
    currentPage * countriesPerPage
  );

  return (
    <div style={{ padding: "2rem" }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        mb={3}
      >
        <TextField
          label="Search countries"
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          sx={{ minWidth: 200, flex: 1 }}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Region</InputLabel>
          <Select
            value={regionFilter}
            onChange={(e: SelectChangeEvent) => {
              setRegionFilter(e.target.value);
              setCurrentPage(1);
            }}
            label="Region"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="Americas">Americas</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 170 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={(e: SelectChangeEvent) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
            label="Sort By"
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="name">Name (A-Z)</MenuItem>
            <MenuItem value="population">Population (High to Low)</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ minWidth: 150 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearFilters}
            fullWidth
            sx={{ height: "56px" }}
          >
            Clear Filters
          </Button>
        </Box>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedCountries.map((country) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
                <CountryCard country={country} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </div>
  );
};

export default CountriesList;
