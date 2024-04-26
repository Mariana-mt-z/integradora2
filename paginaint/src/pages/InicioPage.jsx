import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/Auth.Context';
import MovimientoChart from '../components/GraficaMovimiento'; 
import NavigationBar from './NavigationBar';
import MensajePage from '../components/MensajePage';
import GasChart from '../components/GraficaGas'; 
import TemperaturaChart from '../components/GraficaTemperatura';
import FooterPage from '../components/FooterPage';

function InicioPage() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
   
  }, []);

  const message = "¡Hola desde Inicio!";

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '20px',
    },
    heading: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginTop: '20px',
      marginBottom: '20px',
      color: '#042D54',
      fontFamily: 'BebasNeue-Regular',
      textAlign: 'center',
    },
    chartContainer: {
      border: '2px solid #69A8E3',
      borderRadius: '5px',
      marginBottom: '20px',
      width: '100%',
      maxWidth: '600px',
      marginLeft: '50px', 
    },
    button: {
      backgroundColor: '#69A8E3',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
      marginTop: '20px',
    },
    chartsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fefefe',
      padding: '20px',
      borderRadius: '10px',
    },
    grafica1: {
      width: '100%',
      marginBottom: '20px',
      maxWidth: '600px',
      
    },
    grafica2: {
      width: '100%',
      marginBottom: '20px',
      maxWidth: '600px',
    },
    grafica3: {
      width: '100%',
      marginBottom: '20px',
      maxWidth: '600px',
    },
  };

  const handleButton2Press = () => {
    setShowModal(true);
  };

  return (
    <div>
      <NavigationBar />
      <div style={styles.container}>
        <MensajePage message={message} />
        <h1 style={styles.heading}>Control de Sensores</h1>
        <div style={styles.chartsWrapper}>
          <div style={styles.chartContainer}>
            <MovimientoChart style={styles.grafica1} />
          </div>
          <div style={styles.chartContainer}>
            <GasChart style={styles.grafica2} />
          </div>
          <div style={styles.chartContainer}>
            <TemperaturaChart style={styles.grafica3} />
          </div>
        </div>
        <button onClick={handleButton2Press} style={styles.button}>Abrir Modal</button>
        {showModal && (
          <div className="modal" style={styles.modal}>
            <div className="modal-content" style={styles.modalContent}>
              <canvas ref={chartRef} />
              <button onClick={() => setShowModal(false)}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
      <FooterPage /> 
    </div>
  );
}

export default InicioPage;
