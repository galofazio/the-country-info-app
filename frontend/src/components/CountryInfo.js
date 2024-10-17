import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CountryInfo.css';
import PopulationChart from './PopulationChart';

const CountryInfo = ({ country, onCountryClick }) => {
  const [flagUrl, setFlagUrl] = useState('');
  const [isCountryLoaded, setIsCountryLoaded] = useState(false); 

  useEffect(() => {
    setFlagUrl(null);
    setIsCountryLoaded(false); 
    const fetchFlag = async () => {
      if (country) {
        try {
          const response = await axios.post('http://localhost:5000/api/country-flag', { iso2: country.countryCode });
          if (response.data) {
            setFlagUrl(response.data.flag); 
          } else {
            console.warn('No flag data received for country:', country.countryCode);
          }
          setIsCountryLoaded(true);
        } catch (error) {
          console.error('Error fetching country flag:', error.message);
        }
      } else {
        console.warn('Country prop is undefined');
      }
    };

    fetchFlag();
  }, [country]);

  if (!country) {
    return <div>Please, select a country from the list</div>;
  }

  const { commonName, officialName, borders, countryCode, region } = country;

  return (
    <div id="big-container">
      <h2>
        {commonName} ({officialName})
        {flagUrl && <img src={flagUrl} alt={`${commonName} flag`} style={{ width: '50px', marginLeft: '10px' }} />}
      </h2>
      <div id="country-main-container">
        <div id="left-container">
          <div id="info-container">
            {country ? (
              <>
                <h3>Country code</h3>
                <p>{countryCode}</p>
                <h3>Region</h3>
                <p>{region}</p>
              </>
            ) : (
              <p>No info</p>
            )}
          </div>
          <div id="bordering-container">
            <h3>Bordering Countries</h3>
            <ul>
              {borders && borders.length > 0 ? (
                borders.map((border) => (
                  <li
                    key={border.countryCode}
                    onClick={() => onCountryClick(border.countryCode)} 
                    style={{ cursor: 'pointer', marginBottom: '0.5em' }} 
                  >
                    {border.commonName}
                  </li>
                ))
              ) : (
                <li>No bordering countries</li>
              )}
            </ul>
          </div>
        </div>
        <div id="right-container">
          <h3>Population Data Over Time</h3>
          {isCountryLoaded ? (
            <PopulationChart country={country} />
          ) : (
            <div>Loading country data...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;
