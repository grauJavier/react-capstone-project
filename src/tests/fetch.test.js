import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchAirQuality } from '../redux/slices/airQualitySlice'; // Adjust the path to your airQualitySlice file
import axios from './__mocks__/axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchAirQuality Thunk', () => {
  let store;
  let axiosGetSpy;

  beforeEach(() => {
    store = mockStore({
      location: {},
      isLoading: false,
      error: null,
    });

    axiosGetSpy = jest.spyOn(axios, 'get');
  });

  afterEach(() => {
    store.clearActions();
    axiosGetSpy.mockRestore();
  });

  it('should fetch air quality data successfully', async () => {
    const mockAirQualityData = {
      coord: [50, 50],
      list: [
        {
          dt: 1605182400,
          main: {
            aqi: 1,
          },
          components: {
            co: 201.94053649902344,
            no: 0.01877197064459324,
            no2: 0.7711350917816162,
            o3: 68.66455078125,
            so2: 0.6407499313354492,
            pm2_5: 0.5,
            pm10: 0.540438711643219,
            nh3: 0.12369127571582794,
          },
        },
      ],
    };
    const lat = 50;
    const lon = 50;
    axiosGetSpy.mockResolvedValueOnce({ data: mockAirQualityData });

    await store.dispatch(fetchAirQuality({ lat, lon }));

    const actions = store.getActions();
    expect(actions[0].type).toBe('airQuality/fetchAirQuality/pending');
    expect(actions[1].type).toBe('airQuality/fetchAirQuality/fulfilled');
    expect(actions[1].payload).toEqual(mockAirQualityData);
  });

  it('should handle fetchAirQuality error', async () => {
    const lat = 50;
    const lon = 50;
    const errorMessage = 'Network Error';
    axiosGetSpy.mockRejectedValueOnce(new Error(errorMessage));

    await store.dispatch(fetchAirQuality({ lat, lon }));

    const actions = store.getActions();
    expect(actions[0].type).toBe('airQuality/fetchAirQuality/pending');
    expect(actions[1].type).toBe('airQuality/fetchAirQuality/rejected');
    expect(actions[1].error.message).toBe('Error fetching data');
  });
});
