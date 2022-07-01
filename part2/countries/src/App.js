import { useState, useEffect } from "react";
import axios from "axios";

const CountryListing = ({ countries, query, selectCountry }) => {
  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />;
  } else if (countries.length > 10 && query) {
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

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

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
    </div>
  );
};

export default App;
