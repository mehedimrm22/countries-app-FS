import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
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
      <CardActionArea
        component={Link}
        to={`/countries/${encodeURIComponent(country.name.common)}`}
      >
        <CardMedia
          component="img"
          height="140"
          image={country.flags.png}
          alt={country.flags.alt || country.name.common}
        />
      </CardActionArea>

      {/* Card content with favorite icon */}
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
      </CardContent>
    </Card>
  );
};

export default CountryCard;
