import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Details from "./Details";
import { BrowserRouter } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import '@testing-library/jest-dom';

// Мокируем useParams и useNavigate
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

// Мокаем fetchHourlyForecast
jest.mock("../../api/weatherApi", () => ({
  fetchHourlyForecast: jest.fn(),
}));

import { fetchHourlyForecast } from "../../api/weatherApi";

beforeAll(() => {
  // Мок ResizeObserver
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("Details Component", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ city: "London" });
  });

  test("Отображение состояния загрузки", () => {
    (fetchHourlyForecast as jest.Mock).mockResolvedValueOnce({ list: [] });

    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    );

    // Проверяем отображение состояния загрузки
    expect(screen.getByText(/Loading data for London.../i)).toBeInTheDocument();
  });

  test("Отображение данных после загрузки", async () => {
    (fetchHourlyForecast as jest.Mock).mockResolvedValueOnce({
      list: [
        {
          dt_txt: "2024-12-08 12:00:00",
          main: { temp: 10, humidity: 50 },
          wind: { speed: 5 },
          weather: [{ main: "Clear", icon: "01d" }]
        }
      ]
    });

    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Weather Details for London/i)).toBeInTheDocument();
    });

    expect(screen.getByText("12:00")).toBeInTheDocument();
    expect(screen.getByText("10°C")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  test("Проверка работы кнопки 'Go Back'", async () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    (fetchHourlyForecast as jest.Mock).mockResolvedValueOnce({
      list: [
        {
          dt_txt: "2024-12-08 12:00:00",
          main: { temp: 10, humidity: 50 },
          wind: { speed: 5 },
          weather: [{ main: "Clear", icon: "01d" }]
        }
      ]
    });

    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Weather Details for London/i)).toBeInTheDocument();
    });

    const backButton = screen.getByRole("button", { name: /Go Back/i });
    fireEvent.click(backButton);

    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
