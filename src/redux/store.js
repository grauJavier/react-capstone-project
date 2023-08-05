import { configureStore } from '@reduxjs/toolkit';
import airQualitySlice from './slices/airQualitySlice';

const store = configureStore({
  reducer: {
    airQuality: airQualitySlice,
  },
});

export default store;
