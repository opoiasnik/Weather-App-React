import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CitiesState {
  cities: string[];
}

const initialState: CitiesState = {
  cities: [],
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload;
    },
    addCity: (state, action: PayloadAction<string>) => {
      if (!state.cities.includes(action.payload)) {
        state.cities.push(action.payload);
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter((city) => city !== action.payload);
    },
  },
});

export const { setCities, addCity, removeCity } = citiesSlice.actions;
export default citiesSlice.reducer;
