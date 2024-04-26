import React from 'react';
import MovimientoChart from './MovimientoChart';

const MovimientoChartContainer = () => {
  return (
    <div style={styles.container}>
      <MovimientoChart />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end', // Alinea la gráfica hacia el extremo derecho del contenedor
    paddingRight: '20%', // Espacio a la derecha para mover la gráfica
  },
};

export default MovimientoChartContainer;
