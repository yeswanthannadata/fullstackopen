import { useState, useEffect } from "react";
import axios from "axios";

const CountryListing = ({ countries, query }) => {
  const filteredCountries = countries.filter((country) => {
    if (country.name.common.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    return false;
  });
  if (filteredCountries.length === 1) {
    return <CountryDetail country={filteredCountries[0]} />;
  } else if (filteredCountries.length > 10 && query) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length <= 10) {
    return filteredCountries.map((country) => (
      <p key={country.ccn3}>{country.name.common}</p>
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

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      find countries
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <CountryListing countries={countries} query={query} />
    </div>
  );
};

export default App;
