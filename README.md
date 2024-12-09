# Weather App - React + TypeScript + Vite

## Overview
This is a simple Weather Application built using React, TypeScript, and Vite. The application allows users to:

- View a list of cities and their current weather conditions.
- Add and remove cities from the list.
- View detailed weather information for each city.

The project uses Redux Toolkit for state management and integrates with the OpenWeatherMap API to fetch weather data.

---

## Features
- **Dynamic City Management:** Add or remove cities from the list.
- **Weather Details:** Display current weather, temperature, humidity, and wind speed.
- **Detailed View:** Navigate to detailed weather information for any city.
- **Data Persistence:** Save the city list in `localStorage` for persistence.
- **Responsive Design:** Fully responsive for both desktop and mobile devices.

---

## Tech Stack
- **Frontend Framework:** React
- **State Management:** Redux Toolkit
- **Type Checking:** TypeScript
- **Build Tool:** Vite
- **Styling:** SCSS and Styled Components
- **API Integration:** OpenWeatherMap API

---

## Installation

### Prerequisites
Ensure you have the following installed on your machine:

- Node.js (>= 16.x.x)
- npm (comes with Node.js) or Yarn

### Steps to Set Up

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/weather-app.git
   cd weather-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
   Replace `your_api_key_here` with your OpenWeatherMap API key.

4. **Run the Application:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   This will start the development server. Open `http://localhost:5173` in your browser.

5. **Build for Production:**
   To create a production-ready build, run:
   ```bash
   npm run build
   # or
   yarn build
   ```

6. **Preview Production Build:**
   To preview the production build locally:
   ```bash
   npm run preview
   # or
   yarn preview
   ```

---

## Project Structure

```
├── src
│   ├── api
│   │   └── weatherApi.ts      # Functions for API calls
│   ├── components
│   │   └── CityCard
│   │       └── CityCard.tsx   # City card component
│   ├── features
│   │   ├── cities
│   │   │   └── citiesSlice.ts # Redux slice for managing cities
│   │   ├── weather
│   │   │   └── weatherSlice.ts# Redux slice for weather data
│   ├── pages
│   │   ├── Home
│   │   │   └── Home.tsx       # Home page
│   │   ├── Details
│   │       └── Details.tsx    # Details page
│   ├── store
│   │   └── store.ts           # Redux store configuration
│   ├── styles
│   │   └── global.scss        # Global styles
│   ├── App.tsx                # Main app component
│   └── main.tsx               # Entry point
├── public                     # Static assets
├── .env                       # Environment variables
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── README.md                  # Project documentation
```

---

## Redux Configuration

### Store Configuration
The `store.ts` file combines reducers from different slices:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from '../features/cities/citiesSlice';
import weatherReducer from '../features/weather/weatherSlice';

const store = configureStore({
  reducer: {
    cities: citiesReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
```

---

## ESLint Configuration
To maintain code quality, ESLint is configured with type-aware rules.

### Type-Aware Lint Rules
Add the following to `eslint.config.js`:

```javascript
import react from 'eslint-plugin-react';

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: { react },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

---

## API Integration
The `weatherApi.ts` file contains functions for interacting with the OpenWeatherMap API:

```typescript
export const fetchWeatherByCity = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
};
```

---

## Testing

### Running Tests
The project uses Jest and React Testing Library for unit and integration tests. To run tests:

```bash
npm test
# or
yarn test
```

### Test Structure
Tests are located alongside their components in the `__tests__` folder. For example:

```
├── src
│   ├── components
│   │   ├── CityCard
│   │   │   ├── CityCard.tsx
│   │   │   └── __tests__
│   │   │       └── CityCard.test.tsx
```

---

## Deployment
The application can be deployed to any static hosting platform that supports SPAs, such as:

- **Netlify**
- **Vercel**
- **GitHub Pages**

Follow the respective platform's documentation for deploying Vite applications.

---

## Future Improvements
- Add support for weather forecasts (5-day, hourly).
- Enhance error handling and loading states.
- Implement user authentication for personalized features.
- Add unit tests for Redux slices.

---

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

