import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_ID = 'a9c68b81075118b3d0bd7eccffdd015e';
const URL = 'http://api.openweathermap.org/data/2.5/air_pollution?';

const fetchAirQuality = createAsyncThunk('airQuality/fetchAirQuality', async ({ lat, lon }) => {
  try {
    const response = await axios.get(`${URL}lat=${lat}&lon=${lon}&appid=${API_ID}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data');
  }
});

const initialState = {
  location: {},
  isLoading: false,
  error: null,
};

const airQualitySlice = createSlice({
  name: 'airQuality',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAirQuality.pending, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      }))
      .addCase(fetchAirQuality.fulfilled, (state, action) => {
        const { lat, lon } = action.meta.arg;
        return {
          ...state,
          isLoading: false,
          error: null,
          location: {
            ...state.location,
            [`${lat},${lon}`]: action.payload,
          },
        };
      })
      .addCase(fetchAirQuality.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }));
  },
});

export default airQualitySlice.reducer;
export { fetchAirQuality };
