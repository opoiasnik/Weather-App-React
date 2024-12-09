// src/features/weather/weatherSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherByCity } from '../../api/weatherApi';

interface WeatherState {
  weatherData: { [city: string]: any };
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weatherData: {},
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherByCity(city);
      console.log(data)
      return { city, data };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeatherData(state) {
      state.weatherData = {};
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
        const { city, data } = action.payload;
        state.weatherData[city] = data;
        state.loading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
