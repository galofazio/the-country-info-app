const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());

app.get('/api/available-countries', async (req, res) => {
  try {
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching countries' });
  }
});

app.get('/api/country-info/:countryCode', async (req, res) => {
    const { countryCode } = req.params;

    try {
        const borderCountriesResponse = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
        
        const countryInfo = borderCountriesResponse.data;

        const borderCountries = countryInfo.borders || [];

        const countryData = {
            commonName: countryInfo.commonName,
            officialName: countryInfo.officialName,
            countryCode: countryInfo.countryCode,
            region: countryInfo.region,
            borders: borderCountries.map(border => ({
                commonName: border.commonName,
                officialName: border.officialName,
                countryCode: border.countryCode,
                region: border.region,
                borders: null 
            })),
            population: null,
            flagUrl: null
        };

        res.json(countryData);
    } catch (error) {
        console.error('Error fetching country info:', error);
        res.status(500).json({ message: 'Error fetching country information' });
    }
});

app.post('/api/country-flag', async (req, res) => {
    const { iso2 } = req.body;

    try {
        const response = await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', { iso2 });
        const flagData = response.data.data;
        res.json(flagData);
    } catch (error) {
        console.error('Error fetching country flag:', error.message);
        res.status(500).json({ message: 'Error fetching country flag' });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});