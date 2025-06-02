import { useEffect } from "react";
import { Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchFavorites } from "../../store/slices/favouritesSlice";

const FavoritesList = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const loading = useAppSelector((state) => state.favorites.loading);
  const error = useAppSelector((state) => state.favorites.error);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (loading) return <Typography>Loading favorites...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Favorite Countries
      </Typography>
      <Grid container spacing={2}>
        {favorites.map((fav) => (
          <Grid item key={fav.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={fav.country_flag}
                alt={fav.country_name}
              />
              <CardContent>
                <Typography variant="h6">{fav.country_name}</Typography>
                <Typography variant="body2">
                  Code: {fav.country_code}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default FavoritesList;
