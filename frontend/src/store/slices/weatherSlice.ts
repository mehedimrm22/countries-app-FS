import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WeatherState } from "../../types/weather";
import { weatherApi } from "../../api/services/weather";

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  "weather/fetch",
  async (city: string, { rejectWithValue }) => {
    try {
      return await weatherApi.getWeatherByCity(city);
    } catch (error) {
      console.error("Weather fetch error:", error);
      return rejectWithValue("Failed to fetch weather data");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeather: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
