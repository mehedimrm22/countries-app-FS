import { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Country } from "../../types/country";
import { useAppDispatch } from "../../store/hooks";
import {
  addFavorite,
  removeFavorite,
  fetchFavorites,
} from "../../store/slices/favouritesSlice";
import { favoritesApi } from "../../api/services/favorites";

type Props = { country: Country };

const FavoriteButton = ({ country }: Props) => {
  const dispatch = useAppDispatch();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    (async () => {
      const fav = await favoritesApi.isFavorite(country.name.common);
      setIsFav(fav);
    })();
  }, [country.name.common]);

  const toggleFavorite = async () => {
    if (isFav) {
      await dispatch(removeFavorite(country.name.common));
    } else {
      await dispatch(addFavorite(country));
    }
    setIsFav(!isFav);
  };

  return (
    <Tooltip title={isFav ? "Remove from favorites" : "Add to favorites"}>
      <IconButton onClick={toggleFavorite} color="error">
        {isFav ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton;
