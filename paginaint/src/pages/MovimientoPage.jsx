import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import NavigationBar from './NavigationBar';
import FooterPage from '../components/FooterPage';
import axios from 'axios';
import { filtrarFechas } from '../components/fechas/operacion';

export const MovimientoPage = () => {
  const [historialMovimientos, setHistorialMovimientos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 

  // Estado y funciones relacionadas con el filtrado por fechas
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estafiltrado, setEstaFiltrado] = useState(false);

  const registrosPorPagina = 10; 
  const indexOfLastRegistro = currentPage * registrosPorPagina;
  const indexOfFirstRegistro = indexOfLastRegistro - registrosPorPagina;

  useEffect(() => {
    fetchData(); 
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/movimiento");
      setHistorialMovimientos(response.data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const mostrarUltimoMovimiento = () => {
    const ultimoMovimiento = historialMovimientos.length > 0 ? historialMovimientos[historialMovimientos.length - 1] : null;
    if (ultimoMovimiento) {
      Swal.fire({
        title: 'Último Movimiento Detectado',
        text: `Se detectó movimiento el ${new Date(ultimoMovimiento.fecha).toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}`,
        icon: 'info',
        confirmButtonText: 'Cerrar'
      });
    } else { 
      Swal.fire({
        title: 'No hay datos',
        text: 'No se han registrado movimientos aún',
        icon: 'info',
        confirmButtonText: 'Cerrar'
      });
    }
  };

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleFechaFinChange = (e) => {
    setFechaFin(e.target.value);
  };

  const handleFiltrarClick = () => {
    const datosFiltrados = filtrarFechas(historialMovimientos, fechaInicio, fechaFin);
    setDatosFiltrados(datosFiltrados);
    setCurrentPage(1); // Reiniciar la página actual a 1
    setEstaFiltrado(true); // Indicar que se está filtrando
  };

  const handleRecienteClick = () => {
    setEstaFiltrado(false); // Desactivar el filtrado
  };

  // Obtener los registros actuales según si se está filtrando o no
  const registrosActuales = estafiltrado ? datosFiltrados.slice(indexOfFirstRegistro, indexOfLastRegistro) : historialMovimientos.slice(indexOfFirstRegistro, indexOfLastRegistro);
  // Calcular el número total de páginas según si se está filtrando o no
  const totalPages = Math.ceil((estafiltrado ? datosFiltrados.length : historialMovimientos.length) / registrosPorPagina);

  return (
    <div>
      <NavigationBar />
      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', marginBottom: '100px', marginLeft: '50px', marginRight: '50px' }}>
        <h2 style={{ fontSize: '45px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}> Movimiento</h2>
        <hr style={{ margin: '0 auto', width: '90%' }} />
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#3f51b5', borderRadius: '5px', marginRight: '10px' }}>
            <button onClick={mostrarUltimoMovimiento} style={{ fontWeight: 'bold', fontSize: '16px', padding: '10px 20px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Ver Último Registro
            </button>
          </div>
        </div>
        {/* Filtrado por fechas */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ border: '2px solid #003094', borderRadius: '5px', marginRight: '10px', padding: '5px' }}>
            <input type="date" value={fechaInicio} onChange={handleFechaInicioChange} />
          </div>
          <div style={{ border: '2px solid #003094', borderRadius: '5px', padding: '5px' }}>
            <input type="date" value={fechaFin} onChange={handleFechaFinChange} />
          </div>
          <button onClick={handleFiltrarClick} style={{ fontWeight: 'bold', fontSize: '16px', padding: '10px 20px', backgroundColor: '#003094', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>
            Buscar
          </button>
          {/* <button onClick={handleRecienteClick} style={{ fontWeight: 'bold', fontSize: '16px', padding: '10px 20px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>
            Reciente
          </button> */}
        </div>
        {/* Tabla de movimientos */}
        <div style={{ overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>
                <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Fecha y Hora</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Movimiento</th>
              </tr>
            </thead>
            <tbody>
              {registrosActuales.map((item, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '', borderBottom: '1px solid #ccc', padding: '10px' }}>
                  <td style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>{new Date(item.fecha).toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</td>
                  <td style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>{item.detectado ? "Se detectó movimiento" : "No se detectó movimiento"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Paginación */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={{ margin: '0 5px', padding: '5px 10px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'none' }}>
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              style={index + 1 === currentPage ? { margin: '0 5px', padding: '5px 10px', backgroundColor: '#8a8a8a', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'none' } : { margin: '0 5px', padding: '5px 10px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'none' }}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} style={{ margin: '0 5px', padding: '5px 10px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'none' }}>
            Siguiente
          </button>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default MovimientoPage;