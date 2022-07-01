import { useState, useEffect } from "react";
import axios from "axios";

const CountryListing = ({ countries, query, selectCountry }) => {
  if (countries.length > 10 && query) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length <= 10) {
    return countries.map((country) => (
      <div key={country.ccn3}>
        <p>{country.name.common}</p>
        <button onClick={() => selectCountry(country)}>show</button>
      </div>
    ));
  } else {
    return <p>search for countries</p>;
  }
};

const CountryDetail = ({ country }) => {
  const languages = Object.entries(country.languages).map((language) => {
    return { name: language[1], id: language[0] };
  });

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {languages.map((language) => (
          <li key={language.id}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} Flag`} />
    </>
  );
};

const WeatherDetail = ({ capital, weather }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <>
      <h1>Weather in {capital}</h1>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={iconUrl} alt="Weather icon" />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (country) {
      const query = country.capital[0];
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&mode=json&units=metric&appid=${apiKey}`;
      axios.get(url).then((response) => {
        setWeather(response.data);
      });
    }
  }, [country]);

  const filteredCountries = countries.filter((country) => {
    if (country.name.common.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    return false;
  });

  const selectCountry = (newCountry) => {
    setCountry(newCountry);
  };

  const queryChange = (event) => {
    setQuery(event.target.value);
    setCountry("");
    setWeather("");
  };

  return (
    <div>
      find countries
      <input value={query} onChange={queryChange} />
      {!country && (
        <CountryListing
          countries={filteredCountries}
          query={query}
          selectCountry={selectCountry}
        />
      )}
      {country && <CountryDetail country={country} />}
      {weather && (
        <WeatherDetail capital={country.capital[0]} weather={weather} />
      )}
    </div>
  );
};

export default App;
