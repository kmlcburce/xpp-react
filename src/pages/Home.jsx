import { Carousel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="fullwidth-carousel">
      <Carousel controls={false} indicators={false} fade>
        <Carousel.Item className="carousel-slide">
        <img className="banner-image" src="/images/banner3.jpeg" alt="Slide 1" />
          <div className="caption-overlay text-end">
            <h1>Track Weather Forecasts</h1>
            <p>Get up-to-date weather predictions from HKO's 9-day forecast feed.</p>
            <Button variant="light" size="lg" onClick={() => navigate('/forecasts')}>View Forecasts</Button>
          </div>
        </Carousel.Item>

        <Carousel.Item className="carousel-slide">
          <img className="banner-image" src="/images/banner4.jpeg" alt="Slide 2" />
          <div className="caption-overlay text-end">
            <h1>See Download Logs</h1>
            <p>Access records of all previously generated and downloaded reports.</p>
            <Button variant="light" size="lg" onClick={() => navigate('/logs')}>View Logs</Button>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
