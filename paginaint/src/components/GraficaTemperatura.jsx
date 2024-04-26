import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TemperaturaContext } from '../context/temperatura.context';

const TemperaturaChart = () => {
  const { historialTemperatura } = useContext(TemperaturaContext);
  const formatDataForChart = () => {
    return historialTemperatura.map(temperatura => ({
      fecha: new Date(temperatura.fecha).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      temperatura: temperatura.temperatura,
      humedad: temperatura.humedad,
    }));
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Sensor de Temperatura y Humedad</h1>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <LineChart
          width={800}
          height={400}
          data={formatDataForChart()}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperatura" stroke="#FF5733" name="Temperatura (°C)" />
          <Line type="monotone" dataKey="humedad" stroke="#3399FF" name="Humedad (%)" />
        </LineChart>
      </div>
    </div>
  );
};

export default TemperaturaChart;
