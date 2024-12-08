import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { fetchWeatherByCity } from "../../api/weatherApi";
import { useNavigate } from "react-router-dom";

interface CityCardProps {
  city: string;
  onRemove: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, onRemove }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const loadWeather = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      console.error("Failed to fetch weather data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  if (loading) return <CardWrapper>Loading...</CardWrapper>;
  if (error) return <CardWrapper>Error loading weather data</CardWrapper>;

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const handleNavigate = () => {
    navigate(`/details/${city}`);
  };

  return (
    <CardWrapper expanded={showDetails}>
      {weatherData && (
        <>
          {showDetails && (
            <div className="infoTop">
              <div className="infoItem">
                <span>Humidity:</span> {weatherData.main.humidity}%
              </div>
              <div className="infoItem">
                <span>Wind:</span> {weatherData.wind.speed} km/h
              </div>
            </div>
          )}
          <div className="cardContent" onClick={toggleDetails}>
            <div className="iconTemp">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
                className="weatherIcon"
              />
              <div className="temp">{Math.round(weatherData.main.temp)}°C</div>
            </div>
            <div className="cityName">
              {city}, {weatherData.sys.country}
            </div>
          </div>
          {showDetails && (
            <div className="infoBottom">
              <div className="infoItem">
                <span>Feels Like:</span> {Math.round(weatherData.main.feels_like)}°C
              </div>
              <div className="infoItem">
                <span>Pressure:</span> {weatherData.main.pressure} hPa
              </div>
            </div>
          )}
          <div className="footer">
            {showDetails && (
              <div className="detailedInfoLink" onClick={handleNavigate}>
                Show Detailed Info
              </div>
            )}
            <div className="buttons">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="remove-button"
              >
                ✖
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  loadWeather();
                }}
                className="refresh-button"
              >
                ⟳
              </button>
            </div>
          </div>
        </>
      )}
    </CardWrapper>
  );
};

const CardWrapper = styled.div<{ expanded: boolean }>`
  width: 300px;
  height: ${({ expanded }) => (expanded ? "240px" : "140px")};
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transition: height 0.3s ease, background 0.3s ease;
  cursor: pointer;
  padding: 15px;

  .cardContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 1;
    margin-top:20px
  }

  .iconTemp {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .weatherIcon {
    width: 60px;
    height: 60px;
  }

  .temp {
    font-size: 1.8em;
    font-weight: bold;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  .cityName {
    margin-top: 10px;
    font-size: 1.1em;
    font-weight: 500;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  .infoTop,
  .infoBottom {
    display: flex;
    justify-content: space-between;
    width: 90%;
    padding: 5px 10px;
    font-size: 0.9em;
  }

  .infoTop {
    position: absolute;
    top: 10px;
    left: 5%;
  }

  .infoBottom {
    margin-top: 10px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  
  }

  .detailedInfoLink {
    font-size: 1em;
    color: #00b4d8;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #0077b6;
    }
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

  .remove-button,
  .refresh-button {
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #fff;
    }
  }
`;

export default CityCard;
