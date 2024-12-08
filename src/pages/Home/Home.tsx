import React, { useState, useEffect } from "react";
import CityCard from "../../components/CityCard/CityCard";
import styles from "./Home.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setCities, addCity, removeCity } from "../../features/cities/citiesSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state: RootState) => state.cities.cities);
  const [newCity, setNewCity] = useState("");

  useEffect(() => {
    const savedCities = localStorage.getItem("cities");
    if (savedCities) {
      const parsed = JSON.parse(savedCities) as string[];
      if (parsed.length > 0) {
        dispatch(setCities(parsed));
      } else {
        dispatch(setCities(["Kyiv", "New York", "London"]));
      }
    } else {
      dispatch(setCities(["Kyiv", "New York", "London"]));
    }
  }, [dispatch]);

  useEffect(() => {
    if (cities.length > 0) {
      localStorage.setItem("cities", JSON.stringify(cities));
    }
  }, [cities]);

  const handleAddCity = () => {
    const cityName = newCity.trim();
    if (cityName && !cities.includes(cityName)) {
      dispatch(addCity(cityName));
      setNewCity("");
    }
  };

  const handleRemoveCity = (city: string) => {
    dispatch(removeCity(city));
  };

  return (
    <main className={styles.home}>
      <h1>Forecast</h1>
      <div className={styles.addCityContainer}>
        <input
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Add a city..."
        />
        <button onClick={handleAddCity}>Add City</button>
      </div>
      <div className={styles.cityList}>
        {cities.map((city) => (
          <CityCard key={city} city={city} onRemove={() => handleRemoveCity(city)} />
        ))}
      </div>
    </main>
  );
};

export default Home;
