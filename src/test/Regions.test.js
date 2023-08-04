import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Regions from '../components/Regions';

jest.mock('../redux/locationData', () => ({
  country: {
    img: 'path/to/image',
    name: 'Chile',
  },
}));

const mockStore = configureMockStore();
const initialState = {};
const store = mockStore(initialState);

describe('Regions Component', () => {
  test('renders Regions component with correct elements', () => {
    render(
      <Provider store={store}>
        <Regions />
      </Provider>,
    );

    const navTitleElement = screen.getByText(/Air/i);
    const h2Element = screen.getByText(/Stats/i);
    expect(navTitleElement).toBeInTheDocument();
    expect(h2Element).toBeInTheDocument();

    const subtitleElement = screen.getByText(/Stats by Region/i);
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders H2 elements with correct text', () => {
    render(
      <Provider store={store}>
        <Regions />
      </Provider>,
    );

    const h2Element = screen.getByText(/Stats/i);
    expect(h2Element).toBeInTheDocument();

    const subtitleElement = screen.getByText(/Stats by Region/i);
    expect(subtitleElement).toBeInTheDocument();
  });
});
