import React, { useState, useContext } from "react";
import Swal from 'sweetalert2';
import { TemperaturaContext } from "../context/temperatura.context";
import NavigationBar from './NavigationBar';
import FooterPage from '../components/FooterPage';
import { filtrarFechas } from '../components/fechas/operacion'; 

const TemperaturaPage = () => {
    const { historialTemperatura } = useContext(TemperaturaContext);
    const [currentPage, setCurrentPage] = useState(1); 
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [datosFiltrados, setDatosFiltrados] = useState([]); 
    const registrosPorPagina = 10; 

    const indexOfLastRegistro = currentPage * registrosPorPagina;
    const indexOfFirstRegistro = indexOfLastRegistro - registrosPorPagina;

    // Obtener los datos actuales dependiendo de si se están aplicando filtros de fechas o no
    const registrosActuales = datosFiltrados.length > 0 ? datosFiltrados.slice(indexOfFirstRegistro, indexOfLastRegistro) : historialTemperatura.slice(indexOfFirstRegistro, indexOfLastRegistro);

    // Calcular el número total de páginas dependiendo de si se están aplicando filtros de fechas o no
    const totalPages = Math.ceil((datosFiltrados.length > 0 ? datosFiltrados.length : historialTemperatura.length) / registrosPorPagina);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const mostrarUltimoRegistro = () => {
        const ultimoRegistro = historialTemperatura.length > 0 ? historialTemperatura[historialTemperatura.length - 1] : null;
        if (ultimoRegistro) {
            Swal.fire({
                title: 'Último Registro de Temperatura y Humedad',
                html: `
                    <b>Fecha y Hora:</b> ${new Date(ultimoRegistro.fecha).toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}<br>
                    <b>Temperatura:</b> ${ultimoRegistro.temperatura} °C<br>
                    <b>Humedad:</b> ${ultimoRegistro.humedad}%
                `,
                icon: 'info',
                confirmButtonText: 'Cerrar'
            });
        } else {
            Swal.fire({
                title: 'No hay registros',
                text: 'No se han registrado datos de temperatura y humedad',
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
        const datosFiltrados = filtrarFechas(historialTemperatura, fechaInicio, fechaFin);
        setDatosFiltrados(datosFiltrados);
        setCurrentPage(1); 
    };
    const styles = {
        container: {
            padding: '20px',
            backgroundColor: '#FFFFFF',
        },
        title: {
            fontSize: '45px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
            backgroundColor: '#FFFFFF'
        },
        button: {
            backgroundColor: '#3f51b5',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '20px',
        },
        tableContainer: {
            width: '80%', // Ancho del contenedor de la tabla
            margin: 'auto', // Centrar horizontalmente
            overflowX: 'auto',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid #ccc',
        },
        tableHeader: {
            backgroundColor: '#f0f0f0',
            borderBottom: '1px solid #ccc',
            padding: '10px',
            textAlign: 'left',
        },
        tableCell: {
            borderBottom: '1px solid #ccc',
            padding: '10px',
        },
        columnHeader: {
            width: '5%', // Ajusta el ancho de las columnas de la cabecera
        },
        pagination: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
        },
        pageLink: {
            margin: '0 5px',
            padding: '5px 10px',
            backgroundColor: '#3f51b5',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            textDecoration: 'none',
        },
        activePageLink: {
            margin: '0 5px',
            padding: '5px 10px',
            backgroundColor: '#8a8a8a',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            textDecoration: 'none',
        },
    };
    
    return (
        <div>
            <NavigationBar />
            <div style={styles.container}>
                <h2 style={styles.title}> Temperatura y Humedad</h2>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <button onClick={mostrarUltimoRegistro} style={styles.button}>
                        Ver Último Registro
                    </button>
                </div>
           
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
                </div>
                {/* Tabla de registros de temperatura y humedad */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeader}>
                                <th style={{ ...styles.tableCell, ...styles.columnHeader }}>Fecha</th>
                                <th style={{ ...styles.tableCell, ...styles.columnHeader }}>Temperatura</th>
                                <th style={{ ...styles.tableCell, ...styles.columnHeader }}>Humedad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrosActuales.map((temperatura, index) => (
                                <tr key={index} style={index % 2 === 0 ? {backgroundColor: '#f9f9f9'} : {}}>
                                    <td style={styles.tableCell}>
                                        {new Date(temperatura.fecha).toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}
                                    </td>
                                    <td style={styles.tableCell}>{temperatura.temperatura}</td>
                                    <td style={styles.tableCell}>{temperatura.humedad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Paginación */}
                <div style={styles.pagination}>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={styles.pageLink}>
                        Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            style={index + 1 === currentPage ? styles.activePageLink : styles.pageLink}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} style={styles.pageLink}>
                        Siguiente
                    </button>
                </div>
            </div>
            <FooterPage />
        </div>
    );
}

export default TemperaturaPage;
