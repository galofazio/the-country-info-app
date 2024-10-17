import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import '../styles/PopulationChart.css';

const PopulationChart = ({ country }) => {
  const [chartData, setChartData] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Country received:", country);

    const fetchPopulation = async () => {
      setLoading(true);
      if (country) {
        try {
          console.log("Fetching population data for:", country.commonName.toLowerCase());

          const response = await axios.post('https://countriesnow.space/api/v0.1/countries/population', {
            country: country.commonName.toLowerCase() 
          });

          console.log("API response:", response.data);

          if (response.data && !response.data.error && response.data.data.populationCounts.length > 0) {
            const populationData = response.data.data.populationCounts;
            setChartData(populationData);
            console.log("Population Data set:", populationData);
          } else {
            console.warn('No se recibieron datos de población para el país:', country.commonName);
            setChartData([]); 
          }
        } catch (error) {
          console.error('Error al obtener los datos de población:', error.message);
          setChartData([]); 
        }
      } else {
        console.log("No country provided, skipping fetch.");
      }
      setLoading(false); 
    };

    fetchPopulation();
  }, [country]);

  if (loading) {
    console.log("Loading state active, showing loading message.");
    return <div>Loading chart data...</div>;
  }

  if (!chartData || chartData.length === 0) {
    console.log("No data available, showing no data message.");
    return <div>No hay datos disponibles para mostrar.</div>;
  }

  console.log("Rendering chart with data:", chartData);

  return (
    <div>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default PopulationChart;
