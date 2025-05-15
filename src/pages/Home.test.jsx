/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('Home Page', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  test('renders carousel slides with correct text and images', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: /slide 1/i })).toBeInTheDocument();
    expect(screen.getByText(/Track Weather Forecasts/i)).toBeInTheDocument();
    expect(screen.getByText(/Get up-to-date weather predictions from HKO's 9-day forecast feed./i)).toBeInTheDocument();

    expect(screen.getByRole('img', { name: /slide 2/i })).toBeInTheDocument();
    expect(screen.getByText(/See Download Logs/i)).toBeInTheDocument();
    expect(screen.getByText(/Access records of all previously generated and downloaded reports./i)).toBeInTheDocument();
  });

  test('buttons navigate to correct routes when clicked', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const forecastsButton = screen.getByRole('button', { name: /View Forecasts/i });
    fireEvent.click(forecastsButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/forecasts');

    const logsButton = screen.getByRole('button', { name: /View Logs/i });
    fireEvent.click(logsButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/logs');
  });
});
