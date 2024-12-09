import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CityCard from "./CityCard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

jest.mock("../../features/weather/weatherSlice", () => ({
  fetchWeather: jest.fn((city: string) => ({
    type: "weather/fetchWeatherMock",
    payload: city,
  })),
}));

describe("CityCard Component", () => {
  test("Отображение состояния загрузки", () => {
    const store = configureStore({
      reducer: {
        weather: () => ({
          loading: true,
          error: null,
          weatherData: {}
        })
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CityCard city="London" onRemove={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  test("Отображение данных после загрузки и переключение деталей", () => {
    const store = configureStore({
      reducer: {
        weather: () => ({
          loading: false,
          error: null,
          weatherData: {
            London: {
              main: { temp: 20, feels_like: 19, humidity: 50, pressure: 1012 },
              wind: { speed: 5 },
              sys: { country: "GB" },
              weather: [{ icon: "01d", description: "clear sky" }]
            }
          }
        })
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CityCard city="London" onRemove={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("London, GB")).toBeInTheDocument();
    expect(screen.getByText("20°C")).toBeInTheDocument();

    expect(screen.queryByText(/Humidity:/i)).toBeNull();
    fireEvent.click(screen.getByText("London, GB"));

    expect(screen.getByText(/Humidity:/i)).toBeInTheDocument();
  });
});
