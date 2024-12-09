import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import citiesReducer, { setCities } from "../../features/cities/citiesSlice";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

describe("Home Component", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cities: citiesReducer,
        weather: () => ({
          weatherData: {
            Kyiv: {
              main: { temp: 20 },
              wind: { speed: 5 },
              sys: { country: "UA" },
              weather: [{ description: "clear sky" }],
            },
            Tokyo: {
              main: { temp: 15 },
              wind: { speed: 3 },
              sys: { country: "JP" },
              weather: [{ description: "cloudy" }],
            },
          },
          loading: false,
          error: null,
        }),
      },
    });

    localStorage.clear();
  });

  test("Отображение списка городов из localStorage", () => {
    const mockCities = ["Kyiv", "Tokyo"];
    localStorage.setItem("cities", JSON.stringify(mockCities));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    mockCities.forEach((city) => {
      expect(screen.getByText((content) => content.includes(city))).toBeInTheDocument();
    });
  });

  test("Добавление нового города", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText("Add a city...");
    fireEvent.change(input, { target: { value: "Tokyo" } });

    const addButton = screen.getByText("Add City");
    fireEvent.click(addButton);

    expect(screen.getByText((content) => content.includes("Tokyo"))).toBeInTheDocument();
  });

  test("Удаление города", () => {
    store.dispatch(setCities(["Kyiv", "Tokyo"]));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText((content) => content.includes("Kyiv"))).toBeInTheDocument();

    const cityCard = screen.getByText((content) => content.includes("Kyiv")).closest(".sc-blHHSb");
    const removeButton = cityCard?.querySelector(".remove-button");
    fireEvent.click(removeButton!);
    expect(screen.queryByText((content) => content.includes("Kyiv"))).toBeNull();
  });
});
