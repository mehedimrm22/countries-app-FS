import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Country } from "../../types/country";
import FavoriteButton from "./FavoriteButton";

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <Card sx={{ maxWidth: 345, height: "100%", position: "relative" }}>
      <CardMedia
        component="img"
        height="140"
        image={country.flags.png}
        alt={country.flags.alt || country.name.common}
      />

      {/* Card content with favorite icon and details */}
      <CardContent sx={{ position: "relative", paddingRight: 5 }}>
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <FavoriteButton country={country} />
        </Box>

        <Typography gutterBottom variant="h6" component="div">
          {country.name.common}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Region: {country.region}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Capital: {country.capital?.[0] || "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Population: {country.population.toLocaleString()}
        </Typography>

        {/* Show Details button */}
        <Box mt={2}>
          <Button
            component={Link}
            to={`/countries/${encodeURIComponent(country.name.common)}`}
            variant="outlined"
            size="small"
            fullWidth
          >
            Show Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
