import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'; 
import { MovimientoContext } from '../context/sensor.context';

const MovimientoChart = () => {
  const { historialMovimientos } = useContext(MovimientoContext);

  
  const contarMovimientosPorDia = () => {
    // Objeto para almacenar el recuento de movimientos por día
    const movimientosPorDia = {};

    historialMovimientos.forEach(movimiento => {
      // Verificar si el movimiento fue detectado
      if (movimiento.detectado) {
        const fecha = new Date(movimiento.fecha);
      
        const dia = fecha.getDate().toString().padStart(2, '0'); 
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); 
        const año = fecha.getFullYear();

        const formattedFecha = `${dia}/${mes}/${año}`;
        movimientosPorDia[formattedFecha] = (movimientosPorDia[formattedFecha] || 0) + 1;
      }
    });

    // Convertir el objeto en un array de objetos para la gráfica de barras
    const data = Object.keys(movimientosPorDia).map(fecha => ({
      fecha,
      movimientos: movimientosPorDia[fecha]
    }));

    return data;
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Sensor de Movimiento </h2>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <BarChart
          width={800}
          height={400}
          data={contarMovimientosPorDia()}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          {/* Quitamos la leyenda */}
          <Bar dataKey="movimientos" fill="#003094" />
        </BarChart>
      </div>
    </div>
  );
};

export default MovimientoChart;
