import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Country } from "../../types/country";

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
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
        <CardContent>
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
      </CardActionArea>
    </Card>
  );
};

export default CountryCard;
