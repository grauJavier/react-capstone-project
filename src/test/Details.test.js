import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailsBreakdown from '../components/DetailsBreakdown';
import data from './__mocks__/elements';

describe('DetailsBreakdown Component', () => {
  test('renders components with their respective data when data is available', () => {
    render(<DetailsBreakdown data={data} />);

    const sulfurElement = screen.getByText('Sulfur Dioxide');
    expect(sulfurElement).toBeInTheDocument();
    expect(screen.getByText('10 ≤ 350')).toBeInTheDocument();
  });
  test('renders components when Nitric Oxide is available', () => {
    render(<DetailsBreakdown data={data} />);

    const noElement = screen.getByText('Nitric Oxide');
    expect(noElement).toBeInTheDocument();
    expect(screen.getByText('80 ≤ 100')).toBeInTheDocument();
  });
  test('renders components when Nitrogen Dioxide is available', () => {
    render(<DetailsBreakdown data={data} />);

    const no2Element = screen.getByText('Nitrogen Dioxide');
    expect(no2Element).toBeInTheDocument();
    expect(screen.getByText('20 ≤ 200')).toBeInTheDocument();
  });
});
