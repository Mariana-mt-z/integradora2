import React, { useState, useContext } from "react";
import NavigationBar from './NavigationBar';
import { GasContext } from '../context/gas.context';
import FooterPage from '../components/FooterPage';
import Swal from 'sweetalert2';
import { filtrarFechas } from '../components/fechas/operacion'; 

function GasPage() {
    const { historialNiveles } = useContext(GasContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [estafiltrado, setEstaFiltrado] = useState(false);
    const [datosFiltrados, setDatosFiltrados] = useState([]); 

    const registrosPorPagina = 10;
    const historialOrdenado = historialNiveles.slice().reverse();
    const totalPages = Math.ceil((estafiltrado ? datosFiltrados.length : historialOrdenado.length) / registrosPorPagina);
    const indexOfLastRegistro = currentPage * registrosPorPagina;
    const indexOfFirstRegistro = indexOfLastRegistro - registrosPorPagina;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (estafiltrado) {
            setEstaFiltrado(false);
        }
    };

    const handleFechaInicioChange = (e) => {
        setFechaInicio(e.target.value);
    };

    const handleFechaFinChange = (e) => {
        setFechaFin(e.target.value);
    };

    const handleFiltrarClick = () => {
        const datosFiltrados = filtrarFechas(historialOrdenado, fechaInicio, fechaFin); // Filtra los datos según las fechas seleccionadas
        setDatosFiltrados(datosFiltrados); // Actualiza el estado con los datos filtrados
        setCurrentPage(1); // Reinicia la página actual a 1
        setEstaFiltrado(true); // Indica que se está filtrando
    };

    const registrosActuales = estafiltrado ? datosFiltrados.slice(indexOfFirstRegistro, indexOfLastRegistro) : historialOrdenado.slice(indexOfFirstRegistro, indexOfLastRegistro);

    const mostrarUltimoNivel = () => {
        const ultimoNivel = historialNiveles.length > 0 ? historialNiveles[historialNiveles.length - 1] : null;
        if (ultimoNivel) {
            Swal.fire({
                title: 'Última Fuga de Gas',
                text: `Fuga de gas registrada el ${new Date(ultimoNivel.fecha).toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}`,
                icon: 'info',
                confirmButtonText: 'Cerrar'
            });
        } else {
            Swal.fire({
                title: 'No hay datos',
                text: 'No se han registrado fugas de gas aún',
                icon: 'info',
                confirmButtonText: 'Cerrar'
            });
        }
    };
    
    const styles = {
        container: {
            padding: '20px',
            backgroundColor: '#FFFFFF',
            marginBottom: '150px',
        },
        title: {
            fontSize: '45px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '20px',
        },
        button: {
            fontWeight: 'bold',
            fontSize: '16px',
            padding: '10px 20px',
            backgroundColor: '#3f51b5',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
            marginBottom: '10px',
        },
        inputContainer: {
            border: '2px solid #3f51b5',
            borderRadius: '5px',
            marginRight: '10px',
        },
        input: {
            padding: '8px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            outline: 'none',
            marginRight: '10px',
        },
        tableContainer: {
            display: 'flex',
            justifyContent: 'center',
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
        rowEven: {
            backgroundColor: '#f9f9f9',
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
                <h2 style={styles.title}> Gas</h2>
                <div style={styles.buttonContainer}>
                    <div style={{ backgroundColor: '#3f51b5', borderRadius: '5px', marginBottom: '20px' }}>
                        <button onClick={mostrarUltimoNivel} style={styles.button}>
                            Ver Último Registro
                        </button>
                    </div>
                </div>
                <div style={styles.buttonContainer}>
                    <div style={styles.inputContainer}>
                        <input type="date" value={fechaInicio} onChange={handleFechaInicioChange} style={styles.input} />
                    </div>
                    <div style={styles.inputContainer}>
                        <input type="date" value={fechaFin} onChange={handleFechaFinChange} style={styles.input} />
                    </div>
                    <button onClick={handleFiltrarClick} style={styles.button}>
                        Buscar
                    </button>
                </div>

                <div style={styles.tableContainer}>
                    <div style={{ width: '80%' }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={styles.table}>
                                <thead>
                                    <tr style={styles.tableHeader}>
                                        <th style={styles.tableCell}>Fecha y Hora</th>
                                        <th style={styles.tableCell}>Fuga Detectada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrosActuales.map((item, index) => (
                                        <tr key={index} style={index % 2 === 0 ? styles.rowEven : {}}>
                                            <td style={styles.tableCell}>{new Date(item.fecha).toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</td>
                                            <td style={styles.tableCell}>{item.fugaDetectada ? "Se detectó fuga" : "No se detectó fuga"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

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

export default GasPage;
