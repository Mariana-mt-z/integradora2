import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { GasContext } from '../context/gas.context'; 

const GasChart = () => {
  const { historialNiveles } = useContext(GasContext); 

  
  const contarRegistrosDeGasPorDia = () => {
    // Objeto para almacenar el recuento de registros de gas por día
    const registrosDeGasPorDia = {};

    
    historialNiveles.forEach(registro => {
      const fecha = new Date(registro.fecha);
      // Obtenemos el día, el mes y el año
      const dia = fecha.getDate().toString().padStart(2, '0'); 
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); 
      const año = fecha.getFullYear();

      const formattedFecha = `${dia}/${mes}/${año}`;
 
      if (registro.fugaDetectada) {
        registrosDeGasPorDia[formattedFecha] = (registrosDeGasPorDia[formattedFecha] || 0) + 1;
      }
    });
  // Convertir el objeto en un array de objetos para la gráfica de barras
    const data = Object.keys(registrosDeGasPorDia).map(fecha => ({
      fecha,
      registrosDeGas: registrosDeGasPorDia[fecha]
    }));

    return data;
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}> 
    <h1 style={{ textAlign: 'center' }}>Sensor de Gas </h1> 
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <BarChart
        width={300}
        height={400}
        data={contarRegistrosDeGasPorDia()}
        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
      >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="registrosDeGas" fill="#003094" />
        </BarChart>
      </div>
    </div>
  );
};

export default GasChart;
