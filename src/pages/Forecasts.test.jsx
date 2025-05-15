import { render, screen } from '@testing-library/react';
import Forecasts from './Forecasts';
import { BrowserRouter } from 'react-router-dom';
import api from '../utils/api';
import { vi } from 'vitest';

vi.mock('../utils/api');  // vitest way to mock modules

const mockForecastData = {
  weatherForecast: [
    {
      forecastDate: "20240516",
      forecastWeather: "Hot with sunny periods",
      forecastMaxtemp: { value: 30 },
      forecastMintemp: { value: 24 },
    },
  ],
};

test('renders forecast data from API', async () => {
  api.get.mockResolvedValue({
    data: mockForecastData,
  });

  render(
    <BrowserRouter>
      <Forecasts />
    </BrowserRouter>
  );

  const cards = await screen.findAllByTestId('forecast-card', {}, { timeout: 10000 });
  expect(cards.length).toBeGreaterThan(0);
  expect(screen.getByText(/Hot with sunny periods/i)).toBeInTheDocument();
});
