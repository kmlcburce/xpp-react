import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import ForecastCard from '../components/ForecastCard';
import api from '../utils/api';
import './Forecasts.css';

export default function Forecasts() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false); // Full-page loading state for both data fetching and download processing
  const [loadingDownload, setLoadingDownload] = useState(false); // State for download

  useEffect(() => {
    setLoading(true); // Show overlay when data fetching starts
    api.get('/forecast?type=fnd')
      .then(res => {
        const data = res.data.weatherForecast || [];

        // Convert temperatures to Fahrenheit
        const converted = data.map(day => ({
          ...day,
          forecastMaxtemp: {
            ...day.forecastMaxtemp,
            value: toFahrenheit(day.forecastMaxtemp.value),
          },
          forecastMintemp: {
            ...day.forecastMintemp,
            value: toFahrenheit(day.forecastMintemp.value),
          },
        }));

        setForecast(converted);
        setLoading(false); // Hide overlay after data is fetched
      })
      .catch(err => {
        console.error('Error fetching forecast:', err);
        setLoading(false); // Hide overlay on error
      });
  }, []);

  const toFahrenheit = (celsius) => {
    const c = parseFloat(celsius);
    if (isNaN(c)) return celsius;
    return Math.round((c * 9) / 5 + 32);
  };

  const download = (type) => {
    setLoading(true); // Show overlay when download starts
    setLoadingDownload(true); // Set downloading state

    api.get(`/generate-forecast?type=${type}`)
      .then(res => {
        const { s3_url } = res.data;

        // Create an invisible anchor tag to trigger the download
        const link = document.createElement('a');
        link.href = s3_url;
        link.download = s3_url.split('/').pop(); // Extract filename from URL
        link.style.display = 'none';

        // Append to body, click to download, and then remove the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setLoading(false); // Hide overlay after download is complete
        setLoadingDownload(false); // Stop loading download spinner
      })
      .catch(err => {
        console.error('Error fetching forecast:', err);
        setLoading(false); // Hide overlay on error
        setLoadingDownload(false); // Stop loading download spinner
      });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">9-Day Weather Forecast (°F)</h2>

      {(loading || loadingDownload) && (
        <div className="loading-overlay">
          <Spinner animation="border" variant="light" />
        </div>
      )}

      <Row>
        {forecast.map((day, index) => (
          <Col key={index} sm={6} md={4} lg={3} className="mb-4 d-flex">
            <ForecastCard data={day} />
          </Col>
        ))}
      </Row>

      <div className="d-flex gap-2 justify-content-center mt-3">
      {!loadingDownload ? (
            <>
            <Button
          variant="primary"
          onClick={() => download('9day')}
          disabled={loadingDownload} 
        >
          Download 9 Day Forecast
        </Button>

        <Button
          variant="secondary"
          onClick={() => download('current')}
          disabled={loadingDownload} 
        >
          Download Current Day Forecast
        </Button>
            </>
          ) : (
            ""
          )}
        
      </div>
    </Container>
  );
}
