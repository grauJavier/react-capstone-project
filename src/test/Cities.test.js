import React from 'react';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Cities from '../components/Cities';

window.scrollTo = jest.fn();

const CHILE = {
  reg2: {
    reg_nr: 'I',
    name: 'Región de Tarapacá',
    name_short: 'Tarapacá',
    img: '/assets/chile_region2_tarapaca.png',
    capital: {
      name: 'Iquique',
      lat: -20.2167,
      lon: -70.15,
    },
    cities: {
      'Alto Hospicio': { lat: -20.25, lon: -70.1167 },
      // Para mas data si se quiere
    },
  },
};

jest.mock('../redux/locationData', () => CHILE);

describe('<Cities />', () => {
  it('should render the cities component with correct data', () => {
    const mockStore = configureStore();
    const initialState = {
      airQuality: {
        location: {
          '-20.2167,-70.15': {
            list: [
              {
                main: {
                  aqi: 1,
                },
              },
            ],
          },
        },
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/cities/reg2']}>
          <Routes>
            <Route path="/cities/:name" element={<Cities />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/I Región de Tarapacá/)).toBeInTheDocument();
    expect(screen.getByText(/Air Pollution - Chile - Cities/)).toBeInTheDocument();
    expect(screen.getByText(/Air Quality\s*·\s*Good/)).toBeInTheDocument();
    expect(screen.getByAltText('Tarapacá')).toHaveAttribute('src', '/assets/chile_region2_tarapaca.png');
    expect(screen.getByText('Stats by City')).toBeInTheDocument();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
