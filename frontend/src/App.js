import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';
import CountryInfo from './components/CountryInfo';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/available-countries');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryClick = async (countryCode) => {
    if (!countryCode) {
      console.error('Country code is undefined');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/country-info/${countryCode}`);
      setSelectedCountry(response.data);
    } catch (error) {
      console.error('Error fetching country info:', error);
    }
  };

  return (
    <>
      <header>
        <h1>The Country Info App</h1>
      </header>
      <div id="main-container">
        <aside>
          <h3>Available Countries</h3>
          <ul id="countries-ul">
            {countries.map((country) => (
              <li
                key={country.countryCode}
                onClick={() => handleCountryClick(country.countryCode)}
                style={{ cursor: 'pointer', marginBottom: '0.5em' }}
              >
                {country.name}
              </li>
            ))}
          </ul>
        </aside>
        <main style={{ padding: '1em', flexGrow: 1, maxHeight: "100%" }}>
          <CountryInfo country={selectedCountry} onCountryClick={handleCountryClick} />
        </main>
      </div>
    </>
  );
};

export default App;
