import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Country } from "../../types/country";
import { CountryFavorite } from "../../types/favorite";
import { favoritesApi } from "../../api/services/favorites";

export const fetchFavorites = createAsyncThunk<CountryFavorite[]>(
  "favorites/fetchFavorites",
  async () => {
    return await favoritesApi.getFavorites();
  }
);

export const addFavorite = createAsyncThunk<CountryFavorite, Country>(
  "favorites/addFavorite",
  async (country) => {
    return await favoritesApi.addFavorite(country);
  }
);

export const removeFavorite = createAsyncThunk<string, string>(
  "favorites/removeFavorite",
  async (countryName) => {
    await favoritesApi.removeFavorite(countryName);
    return countryName;
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [] as CountryFavorite[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (_, action) => {
        return action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        // Prevent duplicates (in case of race condition or retry)
        if (
          !state.some((fav) => fav.country_name === action.payload.country_name)
        ) {
          state.push(action.payload);
        }
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        return state.filter((fav) => fav.country_name !== action.payload);
      });
  },
});

export default favoritesSlice.reducer;
