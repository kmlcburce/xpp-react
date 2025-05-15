import { Card } from 'react-bootstrap';
import './ForecastCard.css';

export default function ForecastCard({ data }) {
  const { forecastDate, forecastWeather, forecastMaxtemp, forecastMintemp } = data;

  const formattedDate = new Date(forecastDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'))
    .toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <Card className="forecast-card h-100 shadow-sm border-0" data-testid="forecast-card">
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="mb-2 fw-bold text-primary">{formattedDate}</Card.Title>
          <Card.Text className="mb-3 text-muted">{forecastWeather}</Card.Text>
        </div>
        <div className="temperature-box">
          <div className="d-flex justify-content-between">
            <span>🌡 <strong>Max:</strong> {forecastMaxtemp?.value}°F</span>
            <span>❄️ <strong>Min:</strong> {forecastMintemp?.value}°F</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
