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
const initialState = {}; // Set your initial state if needed
const store = mockStore(initialState);

describe('Regions Component', () => {
  test('renders Regions component with correct elements', () => {
    render(
      <Provider store={store}>
        <Regions />
      </Provider>,
    );

    // Your existing test assertions
    // Check if the component with className "nav__title" exists
    const navTitleElement = screen.getByText(/Air/i);
    const h2Element = screen.getByText(/Stats/i);
    expect(navTitleElement).toBeInTheDocument();
    expect(h2Element).toBeInTheDocument();
    // Check if the h2 element with text "Stats by Region" exists
    const subtitleElement = screen.getByText(/Stats by Region/i);
    expect(subtitleElement).toBeInTheDocument();

    // Take a snapshot of the rendered component
    expect(screen.container).toMatchSnapshot();
  });

  test('renders H2 elements with correct text', () => {
    render(
      <Provider store={store}>
        <Regions />
      </Provider>,
    );
    // Your existing test assertions
    // Check if the component with className "nav__title" exists
    const h2Element = screen.getByText(/Stats/i);
    expect(h2Element).toBeInTheDocument();
    // Check if the h2 element with text "Stats by Region" exists
    const subtitleElement = screen.getByText(/Stats by Region/i);
    expect(subtitleElement).toBeInTheDocument();

    // Take a snapshot of the rendered component
    expect(screen.container).toMatchSnapshot();
  });
});
