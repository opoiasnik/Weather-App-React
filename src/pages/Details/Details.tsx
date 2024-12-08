import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";
import { Line, Bar, Doughnut, Radar } from "react-chartjs-2";
import { fetchHourlyForecast } from "../../api/weatherApi";
import styles from "./Details.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const Details: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getForecast = async () => {
      try {
        const data = await fetchHourlyForecast(city || "");
        const hourlyData = data.list.slice(0, 8).map((entry: any) => ({
          time: entry.dt_txt.split(" ")[1].slice(0, 5),
          temp: entry.main.temp,
          humidity: entry.main.humidity,
          windSpeed: entry.wind.speed,
          weatherMain: entry.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`,
        }));
        setForecast(hourlyData);
      } catch (error) {
        console.error("Error fetching forecast:", error);
      } finally {
        setLoading(false);
      }
    };

    getForecast();
  }, [city]);

  if (loading) {
    return (
      <main className={styles.details}>
        <h2>Loading data for {city}...</h2>
      </main>
    );
  }

  const currentDate = new Date().toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const times = forecast.map((f) => f.time);
  const temps = forecast.map((f) => f.temp);
  const humidities = forecast.map((f) => f.humidity);
  const windSpeeds = forecast.map((f) => f.windSpeed);

  const weatherCounts: Record<string, number> = {};
  forecast.forEach((f) => {
    const w = f.weatherMain;
    if (!weatherCounts[w]) weatherCounts[w] = 0;
    weatherCounts[w]++;
  });
  const weatherLabels = Object.keys(weatherCounts);
  const weatherValues = Object.values(weatherCounts);

  const commonChartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
          font: { size: 18 },
        },
      },
    },
    scales: {
      r: {
        angleLines: { color: "#ffffff" },
        grid: { color: "rgba(255, 255, 255, 0.3)" },
        pointLabels: {
          color: "#ffffff",
          font: { size: 16 },
        },
        ticks: {
          color: "#ffffff",
          backdropColor: "rgba(0,0,0,0)",
        },
      },
      x: {
        ticks: {
          color: "#ffffff",
          font: { size: 16 },
        },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      y: {
        ticks: {
          color: "#ffffff",
          font: { size: 16 },
        },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
    },
  };

  const tempChartData = {
    labels: times,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temps,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const humidityChartData = {
    labels: times,
    datasets: [
      {
        label: "Humidity (%)",
        data: humidities,
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const weatherDoughnutData = {
    labels: weatherLabels,
    datasets: [
      {
        label: "Weather Conditions",
        data: weatherValues,
        backgroundColor: [
          "rgba(255, 205, 86, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const windRadarData = {
    labels: times,
    datasets: [
      {
        label: "Wind Speed (km/h)",
        data: windSpeeds,
        backgroundColor: "rgba(153, 102, 255, 0.4)",
        borderColor: "rgba(153, 102, 255, 1)",
        pointBackgroundColor: "rgba(153, 102, 255,1)",
        pointBorderColor: "#fff",
      },
    ],
  };

  return (
    <main className={styles.details}>
      <h2>
        Weather Details for {city} - {currentDate}
      </h2>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        Go Back
      </button>

      <div className={styles.tempChart}>
        <Line data={tempChartData} options={commonChartOptions} />
      </div>

      <div className={styles.otherCharts}>
        <div className={styles.chartBlock}>
          <h3>Humidity (Bar Chart)</h3>
          <Bar data={humidityChartData} options={commonChartOptions} />
        </div>

        <div className={styles.chartBlock}>
          <h3>Weather Conditions (Doughnut Chart)</h3>
          <Doughnut data={weatherDoughnutData} options={commonChartOptions} />
        </div>

        <div className={styles.chartBlock}>
          <h3>Wind Speed (Radar Chart)</h3>
          <Radar data={windRadarData} options={commonChartOptions} />
        </div>
      </div>

      <div className={styles.hourlyForecast}>
        <h3>Hourly Forecast</h3>
        <div className={styles.hourlyContainer}>
          {forecast.map((hour, index) => (
            <div key={index} className={styles.hourBlock}>
              <img src={hour.icon} alt={hour.weatherMain} />
              <p>{hour.time}</p>
              <p>{hour.temp}°C</p>
              <p>{hour.weatherMain}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Details;
